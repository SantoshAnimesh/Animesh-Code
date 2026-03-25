function retryPromise(fn, options = {}) {
  const {
    retries = 3,
    delay = 0,
    backoff = false,
    retryOn = () => true,
  } = options;

  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function returning a Promise");
  }

  return async function (...args) {
    let attempt = 1;

    while (attempt <= retries) { // ✅ includes initial attempt
      try {
        return await fn(...args);
      } catch (err) {
        console.log("attepted",attempt)
        if (attempt >= retries || !retryOn(err)) {
          throw err;
        }

        let waitTime = delay;
        if (backoff) {
          waitTime = delay * Math.pow(2, attempt);
        }

        if (waitTime > 0) {
          await new Promise((res) => setTimeout(res, waitTime));
        }

        attempt++;
      }
    }
  };
}

// --------- Examples ---------

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

// -----output 
attepted 1
attepted 2
fail 1


// --------- explanation code ------------->
This is a retry wrapper utility for async functions (Promises). It allows you to retry a failing function with options like delay, exponential backoff, and custom retry conditions.

Let’s break it down clearly 👇

🔹 1. Function Signature
function retryPromise(fn, options = {})
fn → the async function you want to retry
options → configuration for retry behavior
🔹 2. Options Explained
const {
  retries = 3,
  delay = 0,
  backoff = false,
  retryOn = () => true,
} = options;
✅ retries
Total number of attempts (including first call)
Default: 3
✅ delay
Wait time (ms) before retry
Default: 0 (no wait)
✅ backoff
If true, delay increases exponentially
Formula:
delay * (2 ^ attempt)
✅ retryOn
Function to decide whether to retry based on error
retryOn(err) => boolean
🔹 3. Input Validation
if (typeof fn !== "function") {
  throw new TypeError("fn must be a function returning a Promise");
}

Ensures fn is a function.

🔹 4. Returned Function
return async function (...args)
Returns a new function
Accepts same arguments as original fn
🔹 5. Core Retry Logic
let attempt = 1;

while (attempt <= retries)

👉 Important:

Loop runs up to retries times
Includes first attempt
🔹 6. Try-Catch Execution
try {
  return await fn(...args);
}
If success → return immediately
No more retries
🔹 7. Error Handling
catch (err) {
  console.log("attepted", attempt);
Logs current attempt
🔹 8. Stop Conditions
if (attempt >= retries || !retryOn(err)) {
  throw err;
}

Retry stops if:

Max retries reached
retryOn(err) returns false
🔹 9. Delay Logic
let waitTime = delay;

if (backoff) {
  waitTime = delay * Math.pow(2, attempt);
}
Example (delay = 1000, backoff = true):
Attempt	Wait Time
1	2000 ms
2	4000 ms
3	8000 ms
🔹 10. Waiting
if (waitTime > 0) {
  await new Promise((res) => setTimeout(res, waitTime));
}
Pauses before next retry
🔹 11. Increment Attempt
attempt++;
🔹 12. Final Behavior Summary

👉 Flow:

Call function
If success → return result
If fail:
Check retry condition
Wait (if needed)
Retry
If retries exhausted → throw error
🔹 Example Usage
const apiCall = async () => {
  console.log("Calling API...");
  throw new Error("Fail");
};

const retryApi = retryPromise(apiCall, {
  retries: 3,
  delay: 1000,
  backoff: true,
});

retryApi().catch(console.error);
Output:
Calling API...
attepted 1
(wait 2s)

Calling API...
attepted 2
(wait 4s)

Calling API...
attepted 3
Error: Fail
🔹 Key Insights (Important)
✅ 1. Retries includes first call
retries = 3 → total 3 attempts, not 3 retries
✅ 2. Backoff starts from attempt 1
Might be slightly aggressive (some prefer attempt - 1)
✅ 3. retryOn is powerful

Example:

retryOn: (err) => err.status >= 500

Only retry server errors.

🔹 Possible Improvements 🚀
Fix typo
"attepted" → "attempted"
Better backoff formula
delay * Math.pow(2, attempt - 1)
Add jitter (avoid thundering herd)
waitTime += Math.random() * 100;
Handle sync functions
Wrap fn:
await Promise.resolve(fn(...args))
🔹 Final One-Line Definition

👉 This function creates a resilient wrapper around async operations, 
  automatically retrying failures with configurable strategies like delay, exponential backoff, and conditional retrying.
