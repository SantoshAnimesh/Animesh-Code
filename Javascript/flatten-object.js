function flattenObject(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (
      obj[key] !== null &&
      typeof obj[key] === "object" &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }

  return result;
}

const obj = {
  user: {
    name: "Santosh",
    address: {
      city: "Noida",
      state: "UP",
    },
  },
  age: 25,
};
console.log(flattenObject(obj));

{
  "user.name": "Santosh",
  "user.address.city": "Noida",
  "user.address.state": "UP",
  "age": 25
}
