if (!Promise.myAll) {
  Promise.myAll = function (iterable) {
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
      let resolvedCount = 0;
      let index = 0;

      // 3. Iterate
      for (const item of iterable) {
        const currentIndex = index;
        index++;
        total++;

        // Normalize values (promise / non-promise / thenable)
        Promise.resolve(item)
          .then((value) => {
            results[currentIndex] = value;
            resolvedCount++;

            // 4. All resolved
            if (resolvedCount === total) {
              resolve(results);
            }
          })
          .catch((err) => {
            // 5. Reject immediately
            reject(err);
          });
      }

      // 6. Empty iterable → resolve immediately
      if (total === 0) {
        resolve([]);
      }
    });
  };
}

example------
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
Promise.myAll([p1, p2]).then(console.log);//[1, 2]

// --with error ----
constp1=Promise.resolve("OK");
constp2=Promise.reject("Error");
Promise.myAll([p1,p2])
.then(console.log)
.catch(console.error); // Error

