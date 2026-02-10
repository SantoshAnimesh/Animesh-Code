Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve([]);
    }

    promises.forEach((p, index) => {
      Promise.resolve(p) // handle non-promises
        .then(value => {
          results[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // reject immediately
    });
  });
};


// --------- Example ---------------
const p1 = Promise.resolve(10);
const p2 = new Promise(r => setTimeout(() => r(20), 100));
const p3 = 30;

Promise.myAll([p1, p2, p3])
  .then(res => console.log(res))
  .catch(err => console.log(err));

// ::Output: [10, 20, 30]



