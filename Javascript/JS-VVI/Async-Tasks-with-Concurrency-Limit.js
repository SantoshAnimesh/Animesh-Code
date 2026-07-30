

async function promisePool(tasks,limit) {
  const results = [];
  let i = 0;

  async function worker() {
    while (i < tasks.length) {
      const cur = i++;

      try {
        results[cur] = {
          status: 'fulfilled',
          value: await tasks[cur](),
        };
      } catch (e) {
        results[cur] = {
          status: 'rejected',
          reason: e,
        };
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, worker)
  );

  return results;
}

const apiData = Array.from({length: 20}, (_,index) => {
  return async () => {
    return new Promise((resolve,reject) => {
      const isValid = Math.random() > 0.5;
      setTimeout(()=> {
        if(isValid) {
          resolve(`Resolve: ${index}`)
        } else {
          reject(`Reject: ${index}`)
        }
      },1000);
    })
  }
});

const result = await promisePool(apiData,5);
console.log(result) // 


// ---------------- With Edge Cases ------------------------------------------
/**
 * Run async tasks with limited concurrency.
 * Returns all results (success + failure) in original order.
 */

async function promisePool(tasks, limit = 5) {
  if (!Array.isArray(tasks)) {
    throw new TypeError('tasks must be an array');
  }

  if (!Number.isInteger(limit) || limit <= 0) {
    throw new TypeError('limit must be a positive integer');
  }

  if (tasks.length === 0) {
    return [];
  }

  const results = new Array(tasks.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const currentIndex = nextIndex++;

      if (currentIndex >= tasks.length) {
        break;
      }

      const task = tasks[currentIndex];

      if (typeof task !== 'function') {
        results[currentIndex] = {
          status: 'rejected',
          reason: new TypeError(
            `Task at index ${currentIndex} is not a function`
          ),
        };
        continue;
      }

      try {
        const value = await Promise.resolve().then(task);

        results[currentIndex] = {
          status: 'fulfilled',
          value,
        };
      } catch (error) {
        results[currentIndex] = {
          status: 'rejected',
          reason: error,
        };
      }
    }
  }

  const workerCount = Math.min(limit, tasks.length);

  await Promise.all(
    Array.from({ length: workerCount }, () => worker())
  );

  return results;
}

// -------------------- Example --------------------

const tasks = Array.from({ length: 10 }, (_, i) => {
  return async () => {
    await new Promise(resolve =>
      setTimeout(resolve, Math.random() * 1000)
    );

    // Random failure
    if (Math.random() < 0.3) {
      throw new Error(`Request ${i + 1} failed`);
    }

    return `Request ${i + 1} success`;
  };
});

(async () => {
  const results = await promisePool(tasks, 5);

  console.log(results);
})();












