Function.prototype.myCall = function(context,...args){
  // context = context === null ? window : Object(context);
  context = context ?? window;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  
  return result;
}

const obj = {
  firstName: "SK",
  lastName: "Kumar"
}

function PrintName(tittle,mobile){
  console.log(`${tittle} ${this.firstName} ${this.lastName} ${mobile}`)
}

PrintName.myCall(obj,"MRs","7646"); // MRs SK Kumar 7646


// ---------- Definition ---------------
call() is used to run a function immediately with a custom this context and separate arguments.
