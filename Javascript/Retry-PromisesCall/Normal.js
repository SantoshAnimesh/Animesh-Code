function retryPromise(fn, retries = 3, delay = 500) {
  return new Promise((resolve, reject) => {
    const attempt = (remaining) => {
      fn()
        .then(resolve)
        .catch((err) => {
          if (remaining === 0) {
            reject(err);
          } else {
            setTimeout(() => attempt(remaining - 1), delay);
          }
        });
    };
    attempt(retries);
  });
}

// Example usage:
const unstableTask = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.7 ? resolve("✅ Success") : reject("❌ Failed");
  });
};

retryPromise(unstableTask, 3, 1000)
  .then(console.log)
  .catch(console.error);
