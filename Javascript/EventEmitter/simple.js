This EventEmitter class is a custom implementation of the Publisher–Subscriber (Pub/Sub) pattern in JavaScript.

👉 In simple words:
It allows different parts of your application to communicate with each other using events, without being tightly coupled.

One part emits (fires) an event
Other parts listen (subscribe) to that event
When the event happens → all listeners get executed

Method	Purpose---
on(event, listener):	Register a listener for an event
once(event, listener):	Register a listener that runs only one time
off(event, listener):	Remove a specific listener
emit(event, ...args):	Trigger all listeners of an event

// --------------- COde ----------------->

class EventEmitter {
  constructor() {
    this.events = {};
  }

  // register listener
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // register one-time listener
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper); // remove after first call
    };
    this.on(event, wrapper);
  }

  // remove listener
  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  // emit event
  emit(event, ...args) {
    if (!this.events[event]) return false;

    this.events[event].forEach(listener => {
      try {
        listener(...args);
      } catch (err) {
        console.error(`Error in listener for event "${event}":`, err);
        // 🔹 Error propagation: re-emit an 'error' event
        if (event !== "error") {
          this.emit("error", err);
        }
      }
    });

    return true;
  }
}

// ---------- Examples ------------>
// 1.Basic Example (on + emit)
const emitter = new EventEmitter();
function greet(name) {
  console.log("Hello " + name);
}
// register listener
emitter.on("greet", greet);
// trigger event
emitter.emit("greet", "Santosh");
👉 Output: Hello Santosh

// 2. Multiple Listeners
const emitter = new EventEmitter();
emitter.on("login", () => {
  console.log("User logged in");
});
emitter.on("login", () => {
  console.log("Send welcome email");
});
emitter.emit("login");
👉 Output:
User logged in
Send welcome email

// 3. once() Example (runs only one time)
const emitter = new EventEmitter();
emitter.once("payment", (amount) => {
  console.log("Payment received:", amount);
});
emitter.emit("payment", 100);
emitter.emit("payment", 200); // ignored
👉 Output: Payment received: 100

// 4. off() Example (remove listener)
const emitter = new EventEmitter();
function sayHi() {
  console.log("Hi");
}
emitter.on("event", sayHi);
emitter.emit("event"); // runs
emitter.off("event", sayHi);
emitter.emit("event"); // won't run
👉 Output: Hi

// 5. Error Handling Example (🔥 important)
const emitter = new EventEmitter();
emitter.on("error", (err) => {
  console.log("Global error handler:", err.message);
});
emitter.on("task", () => {
  throw new Error("Something went wrong!");
});
emitter.emit("task");
👉 Output: 
Error in listener for event "task": Error: Something went wrong!
Global error handler: Something went wrong!

// 6. Real-world Example (API + UI)
const emitter = new EventEmitter();
// UI listener
emitter.on("dataFetched", (data) => {
  console.log("Render UI with:", data);
});
// simulate API
function fetchData() {
  setTimeout(() => {
    const data = { name: "Santosh" };
    emitter.emit("dataFetched", data);
  }, 1000);
}
fetchData();
👉 Output (after 1 sec): Render UI with: { name: "Santosh" }
