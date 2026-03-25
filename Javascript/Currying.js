Currying in JavaScript is a technique of transforming a function that takes multiple arguments into a sequence of functions, 
each taking a single argument. This means a curried function takes one argument at a time and returns a new function that takes the next argument, 
and so on, until all arguments have been provided.

// ------Simple code ----------
  function sum(a) {
  return function(b) {
    if (b !== undefined) {
      return sum(a + b);
    } else {
      return a;
    }
  };
}

const mm = sum(1)(2)(3)();
console.log(mm); // 6

// ------- with multipleArg ----------
function crry(callback) {
  return function currying(...args) {
    if (args.length >= callback.length) {
      return callback(...args);
    }
    return function (...nextArgs) {
      return currying(...args, ...nextArgs);
    };
  };
}

function add(v1, v2, v3, v4) {
  return v1 + v2 + v3 + v4;
}

const callCurring = crry(add);

console.log(callCurring(1, 2, 3, 4));   // 10
console.log(callCurring(1, 2)(3, 4));   // 10
console.log(callCurring(1)(2)(3)(4));   // 10

