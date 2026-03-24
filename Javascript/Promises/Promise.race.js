
if (!Promise.myRace) {
  Promise.myRace = function (iterable) {
    return new Promise((resolve, reject) => {
      // Edge case: null or undefined
      if (iterable == null) {
        return reject(new TypeError("Argument is not iterable"));
      }

      // Convert to iterator
      let iterator;
      try {
        iterator = iterable[Symbol.iterator]();
      } catch (err) {
        return reject(new TypeError("Argument is not iterable"));
      }

      let isEmpty = true;

      for (const item of iterable) {
        isEmpty = false;

        // Resolve non-promises using Promise.resolve
        Promise.resolve(item)
          .then(resolve)
          .catch(reject);
      }

      // Edge case: empty iterable → stays pending forever
      if (isEmpty) {
        return; // never resolve/reject
      }
    });
  };
}

---------------- Example---------
  const p1 = new Promise(res => setTimeout(() => res("P1 done"), 100));
const p2 = new Promise(res => setTimeout(() => res("P2 done"), 50));

Promise.myRace([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.error(err)); // P2 done

// ex-2->
  const p1 = new Promise((_, rej) => setTimeout(() => rej("Error from P1"), 30));
const p2 = new Promise(res => setTimeout(() => res("P2 success"), 100));

Promise.myRace([p1, p2])
  .then(console.log)
  .catch(console.error); //Error from P1

// ex-3--->
  Promise.myRace(123)
  .then(console.log)
  .catch(console.error); // TypeError: Argument is not iterable

// ex-4--->
Promise.myRace("abc")
  .then(console.log); // a




