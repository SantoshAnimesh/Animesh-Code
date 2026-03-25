// ----------Simple code----------
function createAsyncCache(fetcher) {
  const cache = new Map();
  
  return async (key) => {
    const cacheKey = String(key);
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    
    const promise = fetcher(key);
    cache.set(cacheKey, promise);
    
    return promise;
  };
}

// Example usage:
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 100);
  });
}

const cachedFetch = createAsyncCache(fetchData);
// Test calls
cachedFetch("111").then(console.log);  // From network
cachedFetch("111").then(console.log);  // From cache
cachedFetch("222").then(console.log);  // From network

// -------------Handle also edge cases-------------->

function createCache(fn, options = {}) {
  const {
    ttl = 0,
    maxSize = Infinity,
    keyResolver = (...args) => JSON.stringify(args),
  } = options;

  const cache = new Map();     // key -> { value, expiry }
  const inFlight = new Map();  // key -> promise

  return async function (...args) {
    const key = keyResolver(...args);
    const now = Date.now();

    // ✅ 1. Check cache
    if (cache.has(key)) {
      const { value, expiry } = cache.get(key);

      if (!expiry || expiry > now) {
        return { data: value, source: "cache" };
      } else {
        cache.delete(key); // expired
      }
    }

    // ✅ 2. Check in-flight (deduplication)
    if (inFlight.has(key)) {
      return inFlight.get(key).then((res) => ({
        ...res,
        source: "deduped",
      }));
    }

    // ✅ 3. Execute function (sync + async safe)
    const promise = Promise.resolve()
      .then(() => fn.apply(this, args))
      .then((result) => {
        const expiry = ttl ? Date.now() + ttl : 0;

        // Save to cache
        cache.set(key, { value: result, expiry });

        // ✅ LRU eviction
        if (cache.size > maxSize) {
          const firstKey = cache.keys().next().value;
          cache.delete(firstKey);
        }

        return { data: result, source: "api" };
      })
      .catch((err) => {
        throw err; // don't cache errors
      })
      .finally(() => {
        inFlight.delete(key);
      });

    // store in-flight promise
    inFlight.set(key, promise);

    return promise;
  };
}

// ----------- Example -----------> 

const fetchData = async (id) => {
  return  id;
};
const cachedFetch = createCache(fetchData, { ttl: 5000 });
async function  display(){
  await cachedFetch(1).then(console.log);
  await cachedFetch(2).then(console.log);
  await cachedFetch(1).then(console.log);
}

display();

// cachedFetch(1).then(console.log);
// cachedFetch(1).then(console.log);


✅ Sync + Async support
✅ Cache + TTL
✅ In-flight deduplication
✅ "api" | "cache" | "deduped" source tracking
✅ LRU eviction
✅ Edge cases handled

“inFlight prevents duplicate concurrent calls by sharing the same promise. I added a deduped source to distinguish reused requests from actual API calls.”

First call → "api"
Second call → "deduped"
Later calls (after resolve) → "cache"

// ----------- Explanation ----------->**************
What this function does (High-Level)
function createCache(fn, options = {})

👉 It wraps any function (sync or async) and adds:

Caching
Expiry (TTL)
Duplicate request prevention
Source tracking (api, cache, deduped)
🔧 Step 1: Options (Configuration)
const {
  ttl = 0,
  maxSize = Infinity,
  keyResolver = (...args) => JSON.stringify(args),
} = options;
✅ What each does:
1. ttl
Time-to-live (cache expiry)
Example: 5000 → cache valid for 5 sec
2. maxSize
Max number of cache entries
Prevents memory overflow
3. keyResolver
(...args) => JSON.stringify(args)

👉 Converts function arguments → unique cache key

Example:

fn(1, 2) → "[1,2]"
📦 Step 2: Internal Storage
const cache = new Map();
const inFlight = new Map();
✅ cache

Stores completed results:

key → { value, expiry }
✅ inFlight

Stores ongoing requests:

key → promise

👉 Used for deduplication

🔁 Step 3: Returned Function
return async function (...args)

👉 This is the new cached version of your function

🔑 Step 4: Generate Key
const key = keyResolver(...args);
const now = Date.now();

👉 Every request is identified by a unique key

✅ Step 5: Cache Check
if (cache.has(key)) {
  const { value, expiry } = cache.get(key);

  if (!expiry || expiry > now) {
    return { data: value, source: "cache" };
  } else {
    cache.delete(key);
  }
}
🔍 Logic:
Case 1: Cache exists and valid

👉 Return cached data

{ data: value, source: "cache" }
Case 2: Cache expired

👉 Delete it and continue

🔄 Step 6: In-Flight Deduplication
if (inFlight.has(key)) {
  return inFlight.get(key).then((res) => ({
    ...res,
    source: "deduped",
  }));
}
🔥 Why this is IMPORTANT

👉 Prevents duplicate API calls

Scenario:
cachedFetch(1);
cachedFetch(1);
First call → API call starts
Second call → reuses same promise
Why .then()?
.then((res) => ({
  ...res,
  source: "deduped"
}))

👉 Modify response to indicate:

Not a fresh API call
Reused existing request
🚀 Step 7: Execute Function
const promise = Promise.resolve()
  .then(() => fn.apply(this, args))
✅ Why Promise.resolve()?

👉 Makes both work:

Sync function ✅
Async function ✅
Example:
const sum = (a, b) => a + b;

Still becomes async-safe

💾 Step 8: Store Result in Cache
.then((result) => {
  const expiry = ttl ? Date.now() + ttl : 0;

  cache.set(key, { value: result, expiry });
✅ What happens:
Save result
Add expiry time
🧹 Step 9: LRU Eviction
if (cache.size > maxSize) {
  const firstKey = cache.keys().next().value;
  cache.delete(firstKey);
}
✅ Why?

👉 Prevent memory overflow

👉 Removes oldest entry

📤 Step 10: Return API Result
return { data: result, source: "api" };
❌ Step 11: Error Handling
.catch((err) => {
  throw err;
})

👉 Important:

Errors are NOT cached
🧽 Step 12: Cleanup
.finally(() => {
  inFlight.delete(key);
});

👉 After request finishes:

Remove from inFlight
📌 Step 13: Store In-Flight Promise
inFlight.set(key, promise);

👉 So other calls can reuse it

🔁 Step 14: Return Promise
return promise;
🎯 Full Flow (Very Important)
First Call
cachedFetch(1)
❌ cache miss
❌ inFlight miss
✅ API call
→ "api"
Second Call (parallel)
cachedFetch(1)
❌ cache miss
✅ inFlight hit
→ "deduped"
Third Call (later)
cachedFetch(1)
✅ cache hit
→ "cache"
  

