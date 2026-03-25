
// ----------- Simple implement ------------
Array.prototype.myFlat = function(depth=1) {
    debugger
    const flatten = (arr,depth) => {
        return arr.reduce((acc,val) => {
            if(Array.isArray(val) && depth) {
                return acc.concat(flatten(val,depth-1))
            } else {
                return acc.concat(val)
            }
        },[])
    }
    
    return flatten(this,depth)
}


let arr = [1,2,1,2,[2,3,2,[4, 7],9,10,[1,3,4]]];
let newResult = arr.myFlat(Infinity);
console.log(newResult) // [1, 2, 1, 2, 2, 3, 2, 4, 7, 9, 10, 1, 3, 4]

// -------------- Handle Edge cases------------->
if (!Array.prototype.myFlat) {
  Array.prototype.myFlat = function(depth = 1) {
    // 1. Handle null / undefined
    if (this == null) {
      throw new TypeError("Array.prototype.myFlat called on null or undefined");
    }

    const arr = Object(this); // handle array-like
    const length = arr.length >>> 0;

    // 2. Convert depth to number
    let d = Number(depth);
    if (isNaN(d)) d = 0;

    const result = [];

    // 3. Recursive helper
    function flatten(currentArr, currentDepth) {
      for (let i = 0; i < currentArr.length; i++) {
        if (!(i in currentArr)) continue; // skip sparse

        const value = currentArr[i];

        if (Array.isArray(value) && currentDepth > 0) {
          flatten(value, currentDepth - 1);
        } else {
          result.push(value);
        }
      }
    }

    flatten(arr, d);
    return result;
  };
}
// ------------ examples ---------

Edge Cases Covered
1. ❌ Null / Undefined
[].myFlat.call(null);
// ❌ TypeError
2. ✅ Default depth = 1
[1, [2, [3]]].myFlat();
// [1, 2, [3]]
3. ✅ Custom depth
[1, [2, [3]]].myFlat(2);
// [1, 2, 3]
4. ✅ Infinite depth
[1, [2, [3, [4]]]].myFlat(Infinity);
// [1, 2, 3, 4]

👉 Works because Infinity > 0 always true

5. ✅ Sparse Arrays (Important)
const arr = [1, , [2, , 3]];

console.log(arr.myFlat());
// [1, 2, 3]

👉 Empty slots are skipped

6. ✅ Array-like Objects
const obj = {
  0: [1, 2],
  1: 3,
  length: 2
};

Array.prototype.myFlat.call(obj);
// [1, 2, 3]
7. ✅ Depth = 0
[1, [2]].myFlat(0);
// [1, [2]]
8. ✅ Non-number depth
[1, [2]].myFlat("2");
// [1, 2]
🧠 Key Concepts (Interview Gold)
🔹 1. Recursion
Needed to flatten nested arrays
Reduce depth each time
🔹 2. Depth Control
if (Array.isArray(value) && currentDepth > 0)
🔹 3. Sparse Handling
if (!(i in currentArr)) continue;
🔹 4. Why Object(this)
Supports array-like inputs
🔹 5. Why NOT new Array(length)
Output size is dynamic (depends on flattening)
🔥 One-Line Intuition

👉 flat =
Recursively open arrays up to given depth and push values into a new array

🚀 Bonus (Interview Trick)
Q: What happens?
[1, [2, [3]]].flat(-1);

👉 Answer:

[1, [2, [3]]]

✔ Because depth ≤ 0 → no flattening
