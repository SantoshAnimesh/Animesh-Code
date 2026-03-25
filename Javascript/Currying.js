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

// ----- Crrying with multiple arg---
function abc(...args) {
  return function(...nextArgs) {
    if(nextArgs.length === 0) {
      return args.reduce((acc,val) => acc + val,0)
    }
    return abc(...args,...nextArgs)
  }
}

const result1 = abc(2, 3, 4)(1)(2, 2, 2, 2)(2)();
const result2 = abc(1)(2)();

console.log(result1); // Output: 20
console.log(result2); // Output: 3

// ------- carrying with callback fun ----------
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

function add(a ,b, c, d) {
  return a + b +c +d;
}

const callCurring = crry(add);

console.log(callCurring(1, 2, 3, 4));   // 10
console.log(callCurring(1, 2)(3, 4));   // 10
console.log(callCurring(1)(2)(3)(4));   // 10



