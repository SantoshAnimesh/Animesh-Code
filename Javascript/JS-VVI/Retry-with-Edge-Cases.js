
// ------- Sort Way ------------
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 1) {
      throw error;
    }

    console.log(`Retrying... ${retries - 1} attempts left`);

    await sleep(delay);

    return retry(fn, retries - 1, delay);
  }
}

----EX-------
  const api = (retries) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if(Math.random() > 0.8) {
        resolve(`Success: ${retries}`)
      }
      reject(`Reject: ${retries}`)
    },500)
  })
}

retry(api,3,500).then((respopnse) => console.log(respopnse)).catch((error) => console.log(error));

Attempt Reject: 3
Success: 2




// --------- With Hanlde Edge Cases ---------------------
function abortError() {
  return new DOMException("Operation aborted", "AbortError");
}

function sleep(delay, signal) {
  if (!Number.isFinite(delay) || delay < 0) {
    return Promise.reject(new RangeError("delay must be a non-negative number"));
  }

  if (signal?.aborted) {
    return Promise.reject(abortError());
  }

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, delay);

    const onAbort = () => {
      clearTimeout(timer);
      cleanup();
      reject(abortError());
    };

    const cleanup = () => {
      signal?.removeEventListener("abort", onAbort);
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function calculateDelay(attempt, baseDelay, maxDelay, jitter) {
  const exponential = baseDelay * 2 ** (attempt - 1);
  const capped = Math.min(maxDelay, exponential);

  // Full jitter (recommended by AWS)
  return jitter ? Math.floor(Math.random() * capped) : capped;
}

async function retry(fn, options = {}) {
  const {
    maxAttempts = 5,
    baseDelay = 500,
    maxDelay = 50000,
    jitter = false,
    signal,
    onRetry,
  } = options;

  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
    throw new RangeError("maxAttempts must be an integer >= 1");
  }

  if (baseDelay < 0 || maxDelay < 0) {
    throw new RangeError("Delays must be non-negative");
  }

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (signal?.aborted) {
      throw abortError();
    }

    try {
      return await fn({ attempt, signal });
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts) {
        throw lastError;
      }

      const delay = calculateDelay(
        attempt,
        baseDelay,
        maxDelay,
        jitter
      );

      try {
        await onRetry?.({
          attempt,
          delay,
          error,
          nextAttempt: attempt + 1,
        });
      } catch {
        // Ignore logging/telemetry errors
      }

      await sleep(delay, signal);
    }
  }

  throw lastError;
}

// Example API that supports cancellation
async function fakeApi({ attempt, signal }) {
  if (signal?.aborted) throw abortError();

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();

      if (Math.random() > 0.8) {
        resolve(`Success on attempt ${attempt}`);
      } else {
        reject(new Error(`Failure on attempt ${attempt}`));
      }
    }, 500);

    const onAbort = () => {
      clearTimeout(timer);
      cleanup();
      reject(abortError());
    };

    const cleanup = () => {
      signal?.removeEventListener("abort", onAbort);
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

const controller = new AbortController();

retry(fakeApi, {
  maxAttempts: 5,
  baseDelay: 500,
  maxDelay: 5000,
  jitter: false,
  signal: controller.signal,
  onRetry: ({ attempt, delay, error, nextAttempt }) => {
    console.log(
      `Attempt ${attempt}: ${error.message}. Retrying in ${delay}ms`
    );
  },
})
  .then(console.log)
  .catch((err) => console.error(err.name, err.message));

// Cancel after 3 seconds
// setTimeout(() => controller.abort(), 3000);

Attempt 1: Failure on attempt 1. Retrying in 500ms
Attempt 2: Failure on attempt 2. Retrying in 1000ms
Attempt 3: Failure on attempt 3. Retrying in 2000ms
Success on attempt 4



Edge-case	                        Handled?
Signal aborts during sleep	      ✅
Abort listener cleanup	          ✅
Negative delay	                  ✅
maxDelay < baseDelay	            ✅
maxAttempts = 0	                  ✅
onRetry throws	                  ✅
Exponential overflow	            ✅ (capped by maxDelay)
