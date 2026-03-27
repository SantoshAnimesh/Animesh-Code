
leading: Means fall immeditate not wait for timer
trailing: it means wait for time

// ------------- Code ----------
function debounce(fn, delay = 0, options = {}) {
  if (typeof fn !== "function") {
    throw new TypeError("Expected a function");
  }

  let timer = null;
  let lastArgs;
  let lastThis;
  let result;

  const { leading = false, trailing = true } = options;

  const debounced = function (...args) {
    lastArgs = args;
    lastThis = this;

    // Execute immediately if leading = true and no timer exists
    const shouldCallNow = leading && !timer;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;

      if (trailing && lastArgs) {
        result = fn.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
      }
    }, delay);

    if (shouldCallNow) {
      result = fn.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    }

    return result;
  };

  // Cancel pending execution
  debounced.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = lastThis = null;
  };

  // Immediately execute pending function
  debounced.flush = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;

      if (lastArgs) {
        result = fn.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
      }
    }
    return result;
  };

  return debounced;
}

// --------examples ----------
// 1. Basic Example (Default: trailing = true)
const log = debounce((msg) => {
  console.log("API Call:", msg);
}, 1000);
log("a");
log("ab");
log("abc");
✅ Output: API Call: abc

// 2. Leading = true (Immediate execution)
const log = debounce(
  (msg) => {
    console.log("Clicked:", msg);
  },
  1000,
  { leading: true, trailing: false }
);
log("btn1");
log("btn2");
log("btn3");
✅ Output:Clicked: btn1

// 3. Leading + Trailing (Both true)
const log = debounce(
  (msg) => {
    console.log("Value:", msg);
  },
  1000,
  { leading: true, trailing: true }
);
log("a");   // runs immediately
log("ab");
log("abc"); // runs after delay
✅ Output:
Value: a
Value: abc

// 4. Cancel Example
const log = debounce((msg) => {
  console.log("Saved:", msg);
}, 1000);
log("draft1");
Cancel before execution
setTimeout(() => {
  log.cancel();
}, 500);
✅ Output: (no output)
