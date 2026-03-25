
// --------- Simple implement ---------
  Array.prototype.customReducers = function (callback, initialValue) {
  let accumulator = initialValue === undefined ? this[0] : initialValue;

  for (let i = initialValue === undefined ? 1 : 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i]);
  }

  return accumulator;
};

// Example usage: Double each element in the array
const numbers = [1, 2, 3, 4, 5];
const result = numbers.customReducers((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(result); // Output: 15 (1 + 2 + 3 + 4 + 5)

// ---------Handle Edge cases ----------------->
if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function(callback, initialValue) {
    // 1. Handle null / undefined
    if (this == null) {
      throw new TypeError("Array.prototype.myReduce called on null or undefined");
    }

    // 2. Callback must be function
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this); // handle array-like
    const length = arr.length >>> 0;

    let accumulator;
    let startIndex = 0;

    // 3. Handle initial value
    if (arguments.length > 1) {
      accumulator = initialValue;
    } else {
      // Find first valid element (important for sparse arrays)
      while (startIndex < length && !(startIndex in arr)) {
        startIndex++;
      }

      // 4. Edge case: empty array with no initial value
      if (startIndex >= length) {
        throw new TypeError("Reduce of empty array with no initial value");
      }

      accumulator = arr[startIndex++];
    }

    // 5. Iterate
    for (let i = startIndex; i < length; i++) {
      if (i in arr) {
        accumulator = callback(accumulator, arr[i], i, arr);
      }
    }

    return accumulator;
  };
}

// ----------- Examples -------------
[1,2,3,4.myReduce((acc, curr) => acc + curr, 0); // 10


✅ Example 2: Without initial value
const arr = [1, 2, 3, 4];

const result = arr.myReduce((acc, curr) => acc + curr);

console.log(result);
👉 Output:
10

✅ Example 3: Multiply values
const arr = [2, 3, 4];

const result = arr.myReduce((acc, curr) => acc * curr, 1);

console.log(result);
👉 Output:
24
✅ Example 4: Find max value
const arr = [5, 10, 2, 8];

const result = arr.myReduce((acc, curr) => {
  return curr > acc ? curr : acc;
});

console.log(result);
👉 Output:
10
✅ Example 5: Flatten array
const arr = [[1, 2], [3, 4], [5]];

const result = arr.myReduce((acc, curr) => acc.concat(curr), []);

console.log(result);
👉 Output:
[1, 2, 3, 4, 5]
✅ Example 6: Count occurrences
const arr = ["a", "b", "a", "c", "b"];

const result = arr.myReduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});

console.log(result);
👉 Output:
{ a: 2, b: 2, c: 1 }
✅ Example 7: Sparse array (VERY IMPORTANT)
const arr = [1, , 3, , 5];

const result = arr.myReduce((acc, curr) => acc + curr, 0);

console.log(result);
👉 Output:
9
💡 Explanation:
Missing indexes are skipped (i in arr)
Only values used → 1 + 3 + 5
✅ Example 8: Without initial + sparse array
const arr = [, , 10, 20];

const result = arr.myReduce((acc, curr) => acc + curr);

console.log(result);
👉 Output:
30
❌ Example 9: Empty array without initial value
[].myReduce((acc, curr) => acc + curr);
👉 Output:
TypeError: Reduce of empty array with no initial value
❌ Example 10: Callback not a function
[1, 2, 3].myReduce(null, 0);
👉 Output:
TypeError: null is not a function
❌ Example 11: null / undefined context
Array.prototype.myReduce.call(null, () => {});
👉 Output:
TypeError: Array.prototype.myReduce called on null or undefined


// ----------- Handle Edge cases -----------
1. ❌ Null / Undefined
[].myReduce.call(null, () => {});
// ❌ TypeError
2. ❌ Callback not a function
[1,2].myReduce(null);
// ❌ TypeError
3. ❌ Empty array + NO initial value
[].myReduce((a,b) => a + b);
// ❌ TypeError: Reduce of empty array
4. ✅ Empty array WITH initial value
[].myReduce((a,b) => a + b, 10);
// ✅ 10
5. ✅ Sparse Array (VERY IMPORTANT)
const arr = [ , , 3, 4];

const res = arr.myReduce((a, b) => a + b);
console.log(res); 
// 7 (3 + 4)

👉 Skips empty slots

6. ✅ No initial value (normal case)
[1,2,3].myReduce((a,b) => a + b);
// 6
7. ✅ With initial value
[1,2,3].myReduce((a,b) => a + b, 10);
// 16
8. ✅ Works with array-like objects
const obj = {
  0: 10,
  1: 20,
  length: 2
};

const res = Array.prototype.myReduce.call(obj, (a,b) => a + b);
console.log(res); 
// 30
🧠 Key Interview Concepts
🔹 1. Initial Value Logic (Most Important)
If provided → start from index 0
If NOT → first defined element becomes accumulator
🔹 2. Sparse Array Handling
if (i in arr)

👉 Skips empty indexes (critical detail)

🔹 3. Why Object(this)
Supports:
strings
arguments
array-like objects
🔹 4. Why length >>> 0
Ensures safe integer length
🔥 One-Liner Intuition

👉 reduce =
Take first value (or initial) → keep combining → return final result

🚀 Bonus (Interview Trick Question)
Q: What happens here?
[ , , 5].reduce((a,b) => a + b);

👉 Answer:

5

✔ Because:

First valid element = 5
No iteration happens after that
  
