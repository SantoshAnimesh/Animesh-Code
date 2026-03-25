
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function(callback, thisArg) {
    // 1. Handle null / undefined
    if (this == null) {
      throw new TypeError("Array.prototype.myFilter called on null or undefined");
    }

    // 2. Callback must be a function
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this); // handle array-like
    const length = arr.length >>> 0;

    const result = []; // dynamic size (unlike map)

    // 3. Iterate
    for (let i = 0; i < length; i++) {
      // handle sparse arrays
      if (!(i in arr)) continue;

      const value = arr[i];

      if (callback.call(thisArg, value, i, arr)) {
        result.push(value);
      }
    }

    return result;
  };
}

// ----------- Example -------->
1. ❌ Null / Undefined
[].myFilter.call(null, x => x);
// ❌ TypeError
2. ❌ Callback not a function
[1,2,3].myFilter(null);
// ❌ TypeError
3. ✅ Sparse Arrays (Important)
const arr = [1, , 3];

const res = arr.myFilter(x => true);
console.log(res);
// [1, 3]

👉 Empty slots are skipped

4. ✅ thisArg support
const obj = { limit: 2 };

const res = [1,2,3].myFilter(function(x) {
  return x > this.limit;
}, obj);

console.log(res);
// [3]
5. ✅ Array-like objects
const obj = {
  0: 10,
  1: 20,
  2: 30,
  length: 3
};

const res = Array.prototype.myFilter.call(obj, x => x > 15);
console.log(res);
// [20, 30]
6. ✅ Always returns new array
const arr = [1,2,3];
const res = arr.myFilter(x => x > 10);

console.log(res);
// []
🧠 Key Concepts (Interview Points)
🔹 1. Dynamic Result Array
Unlike map, size is NOT fixed
So we use:
const result = [];
🔹 2. Sparse Handling
if (!(i in arr)) continue;

👉 Skips empty slots (very important)

🔹 3. Truthy Check
if (callback(...))

👉 Only pushes values where condition is true

🔹 4. thisArg
callback.call(thisArg, value, i, arr)
🔹 5. Works on Array-like
Thanks to Object(this) + length >>> 0
🔥 One-Line Intuition

👉 filter =
Loop → check condition → keep only matching values

🚀 Bonus (Interview Trick)
Q: What happens?
[ , , 3].filter(x => true);

👉 Answer:

[3]

✔ Because:

Empty slots are ignored
Only defined values are processed
