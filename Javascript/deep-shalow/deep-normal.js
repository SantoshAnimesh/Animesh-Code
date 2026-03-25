// ----- Definion ----------
A deep copy is a way of copying an object or data structure such that all nested objects, 
arrays, and values are completely duplicated, not just referenced.
  
The new copy is fully independent of the original.
Any changes made to the copied object do NOT affect the original object.

// ---------- Code ------------>
  
const deepCopy = (value) => {
  if (value === null || typeof value !== 'object') {
    return value; // Return the value if it's not an object
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepCopy(item)); // Recursively copy each array item
  }

  const copiedObject = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      copiedObject[key] = deepCopy(value[key]); // Recursively copy each object property
    }
  }

  return copiedObject;
};

// --------- Examples ----------> 

const a = { x: 1, y: { z: 2 } };
const a2 = deepClone(a);
console.log(a2.y !== a.y); // true
