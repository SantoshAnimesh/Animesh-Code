 Function.prototype.myBind = function (thisArg, ...boundArgs) {
    if (typeof this !== "function") {
      throw new TypeError("bind must be called on a function");
    }

    const fn = this;

    function bound(...callArgs) {
      const context = this instanceof bound ? this : thisArg;
      return fn.apply(context, boundArgs.concat(callArgs));
    }

    if (fn.prototype) {
      bound.prototype = Object.create(fn.prototype);
    }

    return bound;
  };

// -------- Definion ----------->
// bind() in JavaScript is a function method that creates a new function with a fixed this value and (optionally) some pre-set arguments.
  
// ✅ Definition (Simple)
//   - bind() returns a new function where:
//   - this is permanently set to the object you pass.
//   - You can also pre-fill some arguments.


// ------------ Examples ------------->
    const user = {
  name: "Alice",
  greet() {
       console.log("Hello, " + this.name);
    },
  };
  
  const user2 = {
  name: "Alice2",
    greet() {
         console.log("Hello, " + this.name);
      },
  };

user.greet(); // "Hello, Alice"
const greetFn = user.greet;

const boundGreet = user.greet.myBind(user2);
boundGreet(); // "Hello, Alice2"

// ——— Example 2: Pre-fill arguments (partial application) ———
function add(a, b) {
  return a + b;
}

const add10 = add.myBind(null, 10);
console.log(add10(5));  // 15
console.log(add10(20)); // 30


