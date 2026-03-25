function retryPromise(fn, options = {}) {
  const {
    retries = 3,
    delay = 0,
    backoff = true,
    maxDelay = 5000,
    jitter = true,
    retryOn = () => true,
    timeout = 0,
    onRetry = () => {},
  } = options;

  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }

  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  const withTimeout = (promise, ms) => {
    if (!ms) return promise;
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), ms)
      ),
    ]);
  };

  return async function (...args) {
    let attempt = 1;

    while (attempt <= retries) { // ✅ total = retries + 1
      try {
        return await withTimeout(fn(...args), timeout);
      } catch (err) {
        console.log("retry",attempt)
        if (attempt >= retries || !retryOn(err)) {
          throw err;
        }

        onRetry(err, attempt);

        let waitTime = delay;

        if (backoff) {
          waitTime = delay * Math.pow(2, attempt);
        }

        // ✅ cap max delay
        waitTime = Math.min(waitTime, maxDelay);

        // ✅ add jitter
        if (jitter) {
          waitTime = waitTime * (0.5 + Math.random() / 2);
        }

        await wait(waitTime);

        attempt++;
      }
    }
  };
}

// ----------- Examples ----------

const apiCall = (arg) => {
  return new Promise((resolve, reject) => {
    const isValid = Math.random() > 0.8; // ✅ correct

    setTimeout(() => {
      if (isValid) {
        resolve(`Succ ${arg}`);
      } else {
        reject(`fail ${arg}`);
      }
    }, 100);
  });
};

const retryApi = retryPromise(apiCall, { retries: 2 });
retryApi(1).then((res)=>console.log(res)).catch((error)=> console.log(error))

// --------- Code-Explanation ------------->
1. Function Overview
function retryPromise(fn, options = {})

👉 Wraps any async function (fn) and retries it safely with smart strategies.

🔹 2. Options (Important Enhancements)
const {
  retries = 3,
  delay = 0,
  backoff = true,
  maxDelay = 5000,
  jitter = true,
  retryOn = () => true,
  timeout = 0,
  onRetry = () => {},
} = options;
✅ New + Advanced Options
1. backoff = true
Enables exponential delay growth
2. maxDelay
Caps maximum wait time
👉 Prevents very large delays
3. jitter
Adds randomness to delay
👉 Prevents thundering herd problem
4. timeout
Max time allowed for each attempt
👉 If function takes too long → fail
5. onRetry
Callback on every retry
👉 Useful for logging / monitoring
onRetry(error, attempt)
🔹 3. Safety Check
if (typeof fn !== "function") {
  throw new TypeError("fn must be a function");
}
🔹 4. Helper: wait()
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

👉 Used to pause between retries

🔹 5. Helper: withTimeout()
const withTimeout = (promise, ms) => {
  if (!ms) return promise;

  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    ),
  ]);
};
🔥 Key Concept: Promise.race

👉 Whichever finishes first wins:

fn() resolves → success
timeout finishes first → reject "Timeout"
🔹 6. Returned Function
return async function (...args)
Keeps original function signature
Adds retry capability
🔹 7. Retry Loop
let attempt = 0;

while (attempt <= retries)
✅ Important:
Total attempts = retries + 1
Example:
retries = 3 → total tries = 4
🔹 8. Execution
return await withTimeout(fn(...args), timeout);

👉 Combines:

actual function call
timeout protection
🔹 9. Error Handling
catch (err)
🔸 Stop Conditions
if (attempt >= retries || !retryOn(err)) {
  throw err;
}

Retry stops when:

Max retries reached
retryOn says "don’t retry"
🔸 Retry Hook
onRetry(err, attempt);

👉 Called before retrying

Example:

onRetry: (err, attempt) => {
  console.log(`Retry #${attempt}`, err.message);
}
🔹 10. Delay Calculation
Step 1: Base delay
let waitTime = delay;
Step 2: Exponential Backoff
if (backoff) {
  waitTime = delay * Math.pow(2, attempt);
}

Example (delay = 1000):

Attempt	Delay
0	1s
1	2s
2	4s
3	8s
Step 3: Max Cap
waitTime = Math.min(waitTime, maxDelay);

👉 Prevents huge waits

Step 4: Jitter (🔥 important in real systems)
if (jitter) {
  waitTime = waitTime * (0.5 + Math.random() / 2);
}

👉 Converts delay into:

50% → 100% of waitTime

Example:

4000ms → random between 2000ms–4000ms
🔹 11. Wait Before Retry
await wait(waitTime);
🔹 12. Increment Attempt
attempt++;
🔹 13. Full Flow

👉 For each attempt:

Call function with timeout
If success → return
If fail:
Check retry condition
Call onRetry
Calculate delay
Apply cap + jitter
Wait
Retry
🔹 Example Usage
const unstableApi = async () => {
  console.log("Calling API...");
  throw new Error("Server Error");
};

const retryApi = retryPromise(unstableApi, {
  retries: 3,
  delay: 1000,
  timeout: 2000,
  onRetry: (err, attempt) => {
    console.log(`Retrying attempt ${attempt + 1}`);
  },
});

retryApi().catch(console.error);
🔹 Why This Version is 🔥 Production Ready
✅ Handles real-world problems:
Problem	Solution
API hanging	timeout
Server overload	backoff
Traffic spikes	jitter
Infinite delay growth	maxDelay
Debugging	onRetry
Selective retry	retryOn
🔹 Subtle Observations (Interview Level)
⚠️ 1. Attempt starts from 0
Cleaner for backoff math
⚠️ 2. Timeout does NOT cancel original promise
It only ignores it
👉 Real cancellation needs AbortController
⚠️ 3. Jitter range
0.5 → 1.0
Called “equal jitter” strategy
🔹 Final One-Line Definition

👉 This function is a robust retry mechanism that safely re-executes async operations with timeouts, 
  exponential backoff, capped delays, jitter, and lifecycle hooks, making it suitable for real-world distributed systems.
