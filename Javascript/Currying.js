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

// ---------- Best Way --------------
function add(a) {
  let sum = a;

  function inner(b) {
    if (b !== undefined) {
      sum += b;
      return inner;
    }
    return sum;
  }

  inner.valueOf = () => sum;
  inner.toString = () => String(sum);

  return inner;
}

// Usage examples:
console.log(add(1)(2)(3)(4)());      // 10 (with extra parentheses)
console.log(+add(1)(2)(3)(4));       // 10 (without extra parentheses, using unary +)
console.log(add(1)(2)(3)(4).valueOf()); // 10

// Explain
What does this do?
These lines assign custom behavior to the inner function when it is converted to a primitive value (like a number or string).

Why is this useful?
JavaScript allows objects (including functions) to define how they should be converted to a primitive value using valueOf and toString.

valueOf is called when JavaScript expects a number (e.g., in arithmetic or with the unary +).
toString is called when JavaScript expects a string (e.g., in string concatenation or console.log).

Use Cases
1. Arithmetic Operations
The unary + operator tries to convert the function to a number.
It calls valueOf, which returns the sum.
2. Console Logging
console.log tries to convert the function to a string.
It calls toString, which returns the sum as a string.

3. String Concatenation
The function is converted to a string using toString.
Why not just return the sum?
If you just return the sum, you lose the ability to keep chaining calls.
By using valueOf and toString, you can keep returning a function for chaining, but still get the sum when needed.





