

// ---- with eadg cases ----------
if (!Function.prototype.apply) {
  const getGlobal = () =>
    typeof globalThis !== "undefined" ? globalThis : (function () { return this; })();

  Function.prototype.apply = function (thisArg, argsArray) {
    if (typeof this !== "function") {
      throw new TypeError("apply must be called on a function");
    }

    const context = thisArg == null ? getGlobal() : Object(thisArg);
    const key = typeof Symbol !== "undefined" ? Symbol() : "__apply__";
    const args = argsArray != null ? argsArray : [];

    context[key] = this;
    try {
      return context[key](...args);
    } finally {
      delete context[key];
    }
  };
}

// ----------------------------------->

Function.prototype.myApply = function(context, argss) {
  context = context ?? window;
  
  const key = Symbol();
  context[key] = this;
  let  result;
  if(argss){
    result = context[key](...argss);
  } else {
    result = context[key]();
  }
  delete context[key];
  
  return result;
}

// ----------- Examples ---------------

const obj = {
  name: "Animesh",
  mobile: "7646"
}

function display(company,location){
  
  return `${this.name} ${this.mobile} ${company} ${location}`
}

console.log(display.myCall(obj,["classplus", "noida"])) // Animesh 7646 classplus noida


// ---------- Definition --------
apply() calls a function immediately with a custom this context and arguments provided as an array.
