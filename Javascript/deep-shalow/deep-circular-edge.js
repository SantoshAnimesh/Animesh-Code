// --------- Definition ------------
A deep copy is a way of copying an object or data structure such that all nested objects, 
arrays, and values are completely duplicated, not just referenced.

The new copy is fully independent of the original.
Any changes made to the copied object do NOT affect the original object.
// -------------- Code ----------------------?
  
function deepClone(value, weakMap = new WeakMap()) {
  // Primitives or functions: return as-is (functions by reference)
  if (value === null || typeof value !== 'object') return value;

  // Handle circular refs
  if (weakMap.has(value)) return weakMap.get(value);

  // Date
  if (value instanceof Date) return new Date(value.getTime());

  // RegExp
  if (value instanceof RegExp) {
    const flags = value.flags || (value.global ? 'g' : '') + (value.ignoreCase ? 'i' : '') + (value.multiline ? 'm' : '');
    return new RegExp(value.source, flags);
  }

  // Map
  if (value instanceof Map) {
    const clonedMap = new Map();
    weakMap.set(value, clonedMap);
    for (const [k, v] of value.entries()) {
      clonedMap.set(deepClone(k, weakMap), deepClone(v, weakMap));
    }
    return clonedMap;
  }

  // Set
  if (value instanceof Set) {
    const clonedSet = new Set();
    weakMap.set(value, clonedSet);
    for (const v of value.values()) {
      clonedSet.add(deepClone(v, weakMap));
    }
    return clonedSet;
  }

  // ArrayBuffer / TypedArray
  if (ArrayBuffer.isView(value)) {
    // Typed arrays + DataView
    const bufferClone = value.buffer.slice(0);
    const ctor = value.constructor;
    // For DataView, ctor is DataView, needs byteOffset and length
    if (ctor === DataView) {
      return new DataView(bufferClone, value.byteOffset, value.byteLength);
    }
    return new ctor(bufferClone, value.byteOffset, value.length);
  }
  if (value instanceof ArrayBuffer) {
    return value.slice(0);
  }

  // Error objects (preserve message & name)
  if (value instanceof Error) {
    const err = new value.constructor(value.message);
    err.name = value.name;
    // Copy other own properties (stack, custom fields) below with descriptors
    weakMap.set(value, err);
    // fall through to generic object property copying
  }

  // Generic object / array / custom prototype
  const proto = Object.getPrototypeOf(value);
  const target = Object.create(proto);
  weakMap.set(value, target);

  // Get all own keys (including non-enumerable and symbols)
  const keys = Object.getOwnPropertyNames(value).concat(Object.getOwnPropertySymbols(value));

  for (const key of keys) {
    const desc = Object.getOwnPropertyDescriptor(value, key);

    if ('value' in desc) {
      // Data property -> clone value recursively
      desc.value = deepClone(desc.value, weakMap);
    } else {
      // accessor (get/set) -> leave get/set functions as-is (by reference)
      // that's already captured in desc.get / desc.set
    }

    try {
      Object.defineProperty(target, key, desc);
    } catch (err) {
      // Some exotic properties might be non-configurable in weird ways; fall back:
      target[key] = desc.value;
    }
  }

  return target;
}

// ----------- Examples ----------->
const a = { x: 1, y: { z: 2 } };
const a2 = deepClone(a);
console.log(a2.y !== a.y); // true

