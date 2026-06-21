class EventEmitter {
  constructor() {
    this.events = new Map();
    this.maxListeners = 10;
  }

  on(eventName, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("Listener must be a function");
    }

    const listeners = this.events.get(eventName) || [];

    listeners.push(listener);
    this.events.set(eventName, listeners);

    // warning for possible memory leaks
    if (listeners.length > this.maxListeners) {
      console.warn(
        `Warning: More than ${this.maxListeners} listeners added for "${eventName}".`
      );
    }

    return this;
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    wrapper.originalListener = listener;

    return this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName);

    if (!listeners) return this;

    const filtered = listeners.filter(
      (fn) => fn !== listener && fn.originalListener !== listener
    );

    if (filtered.length === 0) {
      this.events.delete(eventName);
    } else {
      this.events.set(eventName, filtered);
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this.events.get(eventName);

    // Node.js-like behavior
    if (eventName === "error" && (!listeners || listeners.length === 0)) {
      throw args[0] instanceof Error
        ? args[0]
        : new Error("Unhandled error event");
    }

    if (!listeners) {
      return false;
    }

    // Prevent mutation during emit
    const copiedListeners = [...listeners];

    for (const listener of copiedListeners) {
      try {
        listener(...args);
      } catch (err) {
        // If an error listener exists, emit it
        if (eventName !== "error") {
          this.emit("error", err);
        } else {
          console.error("Error inside error handler:", err);
        }
      }
    }

    return true;
  }

  removeAllListeners(eventName) {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }

    return this;
  }

  listenerCount(eventName) {
    return this.events.get(eventName)?.length || 0;
  }

  listeners(eventName) {
    return [...(this.events.get(eventName) || [])];
  }

  setMaxListeners(n) {
    if (!Number.isInteger(n) || n < 0) {
      throw new TypeError("maxListeners must be a positive integer");
    }

    this.maxListeners = n;
    return this;
  }
}

export default EventEmitter;
