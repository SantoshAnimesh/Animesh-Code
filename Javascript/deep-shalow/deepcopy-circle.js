// --------- Definition ------------
A deep copy is a way of copying an object or data structure such that all nested objects, 
arrays, and values are completely duplicated, not just referenced.

The new copy is fully independent of the original.
Any changes made to the copied object do NOT affect the original object.

// -------------Code ----------->


const deepCopy = (value, seen = new WeakMap()) => {
  // Handle primitives & functions
  if (value === null || typeof value !== 'object') return value;

  // Handle circular references
  if (seen.has(value)) return seen.get(value);

  // Handle Date
  if (value instanceof Date) return new Date(value);

  // Handle RegExp
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);

  // Handle Map
  if (value instanceof Map) {
    const result = new Map();
    seen.set(value, result);
    value.forEach((v, k) => {
      result.set(deepCopy(k, seen), deepCopy(v, seen));
    });
    return result;
  }

  // Handle Set
  if (value instanceof Set) {
    const result = new Set();
    seen.set(value, result);
    value.forEach(v => {
      result.add(deepCopy(v, seen));
    });
    return result;
  }

  // Handle Array
  if (Array.isArray(value)) {
    const result = [];
    seen.set(value, result);
    value.forEach((item, i) => {
      result[i] = deepCopy(item, seen);
    });
    return result;
  }

  // Handle plain objects
  const result = {};
  seen.set(value, result);
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepCopy(value[key], seen);
    }
  }
  return result;
};

Examples//
const a = { x: 1, y: { z: 2 } };
const a2 = deepClone(a);
console.log(a2.y !== a.y); // true

// circular
const obj = { name: 'alice' };
obj.self = obj;
const c = deepClone(obj);
console.log(c.self === c); // true

// map & set
const m = new Map();
m.set('k', { nested: 1 });
const s = new Set();
s.add(m);
const deep = deepClone(s);
console.log([...deep][0] instanceof Map); // true
