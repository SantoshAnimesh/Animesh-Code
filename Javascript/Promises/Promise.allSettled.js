if (!Promise.myAllSettled) {
  Promise.myAllSettled = function (iterable) {
    return new Promise((resolve, reject) => {
      // 1. Handle null / undefined
      if (iterable == null) {
        return reject(new TypeError("Argument is not iterable"));
      }

      // 2. Check if iterable
      if (typeof iterable[Symbol.iterator] !== "function") {
        return reject(new TypeError("Argument is not iterable"));
      }

      const results = [];
      let total = 0;
      let settledCount = 0;
      let index = 0;

      for (const item of iterable) {
        const currentIndex = index;
        index++;
        total++;

        Promise.resolve(item)
          .then((value) => {
            results[currentIndex] = {
              status: "fulfilled",
              value: value,
            };
          })
          .catch((reason) => {
            results[currentIndex] = {
              status: "rejected",
              reason: reason,
            };
          })
          .finally(() => {
            settledCount++;

            // 3. Resolve only when ALL are settled
            if (settledCount === total) {
              resolve(results);
            }
          });
      }

      // 4. Empty iterable → resolve immediately
      if (total === 0) {
        resolve([]);
      }
    });
  };
}

// -----Example -----
// Mixed Success & Failure
const p1 = Promise.resolve("OK");
const p2 = Promise.reject("Error");

Promise.myAllSettled([p1, p2])
  .then(console.log);

output : [
  { status: "fulfilled", value: "OK" },
  { status: "rejected", reason: "Error" }
]

// All Success
Promise.myAllSettled([
  Promise.resolve(1),
  Promise.resolve(2)
]).then(console.log); 

outpu: 
[
  { status: "fulfilled", value: 1 },
  { status: "fulfilled", value: 2 }
]

// Non-Promise Values
Promise.myAllSettled([1, 2, 3])
  .then(console.log);

output:
[
  { status: "fulfilled", value: 1 },
  { status: "fulfilled", value: 2 },
  { status: "fulfilled", value: 3 }
]

// Empty Iterable
Promise.myAllSettled([]).then(console.log); // []

// String (Iterable)
Promise.myAllSettled("ab").then(console.log);

output:
[
  { status: "fulfilled", value: "a" },
  { status: "fulfilled", value: "b" }
]

// Non-Iterable Error
Promise.myAllSettled(123)
  .catch(console.error); 

output:
TypeError: Argument is not iterable


// ----Edge Cases Covered-----

✔ null / undefined
✔ Non-iterable input
✔ Empty iterable
✔ Mixed values (promise + non-promise)
✔ Thenables
✔ Order preservation
✔ Never rejects (except invalid input)




