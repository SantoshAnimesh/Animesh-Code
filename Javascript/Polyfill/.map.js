// ------ Simeple Implement -----
Array.prototype.customMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// Example usage
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.customMap(function(num) {
  return num * 2;
});

console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]

// ------------ Handle Edge cases ------------> 

if (!Array.prototype.myMap) {
  Array.prototype.myMap = function(callback, thisArg) {
    // 1. Handle null or undefined
    if (this == null) {
      throw new TypeError("Array.prototype.myMap called on null or undefined");
    }

    // 2. Check callback is function
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this); // handle array-like objects
    const length = arr.length >>> 0; // convert to valid length
    const result = new Array(length);

    // 3. Iterate only over existing indexes (handle sparse arrays)
    for (let i = 0; i < length; i++) {
      if (i in arr) {
        result[i] = callback.call(thisArg, arr[i], i, arr);
      }
    }

    return result;
  };
}

------Examples -------
console.log([1,2,3].myMap((num) => num )) // [1,2,3]
console.log([1,2,3].myMap((num,index) => num + index)) // [1,3,4]
console.log([1, ,3].myMap((num,index) => num * 2)) //  [2, <empty>, 6]
[1, 2, 3].myMap(null); // TypeError: null is not a function
Array.prototype.myMap.call(null, x => x);Array.prototype.myMap.call(null, x => x); // TypeError: Array.prototype.myMap called on null or undefined

// with object
const obj = {
  0: "a",
  1: "b",
  length: 2
};
const result = Array.prototype.myMap.call(obj, (char) => char.toUpperCase()); // ["A", "B"]


// --------- Explanation -----------------
🔥 Edge Cases Covered
1. ❌ Null / Undefined
[].myMap.call(null, x => x); 
// ❌ Throws TypeError
2. ❌ Callback not a function
[1,2,3].myMap(null);
// ❌ Throws TypeError
3. ✅ Sparse Array (Important Interview Case)
const arr = [1, , 3];

const res = arr.myMap(x => x * 2);
console.log(res); 
// [2, empty, 6]

👉 Empty slots remain empty (same as native map)

4. ✅ thisArg Support
const obj = {
  factor: 2
};

const res = [1,2,3].myMap(function(x) {
  return x * this.factor;
}, obj);

console.log(res); 
// [2,4,6]
5. ✅ Works on Array-like Objects
const obj = {
  0: 10,
  1: 20,
  length: 2
};

const res = Array.prototype.myMap.call(obj, x => x * 2);
console.log(res); 
// [20, 40]
🧠 Key Concepts (Interview Points)
Uses this == null → catches both null & undefined
Object(this) → supports array-like structures
length >>> 0 → ensures valid unsigned integer
i in arr → skips empty indexes (very important)
callback.call(thisArg, ...) → binds context

// ------------- Logic Exaplin ------------
🔹 1. const arr = Object(this);
✅ Why we use it
Ensures this becomes an object
Handles array-like values (not just real arrays)

👉 In JavaScript, map can be called like:

Array.prototype.myMap.call(something)

So this might NOT be an array.

❌ Problem without this
Array.prototype.myMap.call("abc", x => x);
"abc" is a string (primitive)
Without Object(this) → it may break
✅ With Object(this)
const arr = Object("abc");

console.log(arr);
// String object: {0: 'a', 1: 'b', 2: 'c'}

Now it behaves like an array-like object.

🔥 Use Cases
1. Array-like objects
function test() {
  return Array.prototype.myMap.call(arguments, x => x * 2);
}

test(1,2,3); // [2,4,6]
2. Strings
Array.prototype.myMap.call("abc", x => x.toUpperCase());
// ['A','B','C']
🔹 2. const length = arr.length >>> 0;
✅ Why we use it

This converts length into a safe unsigned 32-bit integer

👉 Ensures:

No negative length
No floating number
No invalid values
❌ Problem without it
const obj = { length: -5 };

Loop will break or behave incorrectly.

✅ With >>> 0
console.log((-5) >>> 0); 
// 4294967291 (converted to valid unsigned int)

👉 Basically:

Forces length into valid range: 0 → 2^32 - 1
🔥 Use Cases
1. Invalid length
const obj = { length: "3" };

const length = obj.length >>> 0;
// 3 (converted from string)
2. Float length
const obj = { length: 3.8 };

const length = obj.length >>> 0;
// 3 (floored)
🔹 3. const result = new Array(length);
✅ Why we use it
Creates result array with same length
Keeps empty slots (sparse array behavior)
❌ If we don’t do this
const result = [];

Then:

Sparse array behavior is lost
Output becomes dense array (incorrect)
🔥 Example (Important)
Sparse array
const arr = [1, , 3];

const res = arr.map(x => x * 2);
console.log(res);
// [2, empty, 6]

👉 Notice:

Index 1 is still empty
Why new Array(length) matters
const result = new Array(3);
// [empty × 3]

Then we only fill existing indexes.

🧠 Summary (Interview Ready)
Line	Purpose
Object(this)	Converts this to object, supports array-like
length >>> 0	Ensures safe valid length
new Array(length)	Preserves array size & sparse behavior
🔥 One-Line Intuition

👉 These 3 lines make your polyfill behave exactly like native Array.map, even for:

strings
arguments
sparse arrays
invalid lengths
