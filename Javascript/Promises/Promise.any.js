
Promise.any:

✔ Resolves when first promise fulfills
❌ Ignores rejections until all fail
❌ Rejects only if ALL promises reject
❗ Rejects with AggregateError

// ---------- code -------

if (!Promise.myAny) {
  Promise.myAny = function (iterable) {
    return new Promise((resolve, reject) => {
      // 1. Handle null / undefined
      if (iterable == null) {
        return reject(new TypeError("Argument is not iterable"));
      }

      // 2. Check if iterable
      if (typeof iterable[Symbol.iterator] !== "function") {
        return reject(new TypeError("Argument is not iterable"));
      }

      const errors = [];
      let total = 0;
      let rejectedCount = 0;
      let index = 0;

      for (const item of iterable) {
        const currentIndex = index;
        index++;
        total++;

        Promise.resolve(item)
          .then((value) => {
            // ✅ First fulfilled wins
            resolve(value);
          })
          .catch((err) => {
            errors[currentIndex] = err;
            rejectedCount++;

            // ❌ All rejected → reject with AggregateError
            if (rejectedCount === total) {
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          });
      }

      // 3. Empty iterable → reject immediately
      if (total === 0) {
        reject(new AggregateError([], "All promises were rejected"));
      }
    });
  };
}

// -----output --------
// First Fulfilled Wins
const p1 = Promise.reject("Error 1");
const p2 = new Promise(res => setTimeout(() => res("Success"), 50));

Promise.myAny([p1, p2])
  .then(console.log)
  .catch(console.error); //Success

// All Rejected
const p1 = Promise.reject("E1");
const p2 = Promise.reject("E2");

Promise.myAny([p1, p2])
  .then(console.log)
  .catch(console.error); //AggregateError: All promises were rejected

// Non-Promise Values
Promise.myAny([Promise.reject("fail"), 42])
  .then(console.log);  // 42

// Empty Iterable
Promise.myAny([])
  .catch(console.error); // AggregateError: All promises were rejected

// String (Iterable)
Promise.myAny("abc")
  .then(console.log); // a

// Mixed Timing
const p1 = new Promise((_, rej) => setTimeout(() => rej("Fail"), 10));
const p2 = new Promise(res => setTimeout(() => res("Win"), 100));

Promise.myAny([p1, p2]).then(console.log); // win



