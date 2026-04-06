Batching	Waits for full batch
Concurrency pool	Starts next immediately


async function runWithConcurrency(tasks, limit) {
  const results = [];
  let i = 0;

  async function worker() {
    while (i < tasks.length) {
      const currentIndex = i++;
      try {
        results[currentIndex] = await tasks[currentIndex]();
      } catch (err) {
        results[currentIndex] = err;
      }
    }
  }

  const workers = Array.from({ length: limit }, worker);
  await Promise.all(workers);

  return results;
}

// --------- Examples ----------- >
const tasks = [
  () => new Promise(res => setTimeout(() => {
    console.log("Task 0 done");
    res(0);
  }, 1000)),

  () => new Promise(res => setTimeout(() => {
    console.log("Task 1 done");
    res(1);
  }, 500)),

  () => new Promise(res => setTimeout(() => {
    console.log("Task 2 done");
    res(2);
  }, 300)),

  () => new Promise(res => setTimeout(() => {
    console.log("Task 3 done");
    res(3);
  }, 700)),

  () => new Promise(res => setTimeout(() => {
    console.log("Task 4 done");
    res(4);
  }, 200))
];

runWithConcurrency(tasks, 2).then(res => {
  console.log("Final Results:", res);
});


running 0
running 1
Task 1 done
running 2
Task 2 done
running 3
Task 0 done
running 4
Task 4 done
Task 3 done
Final Results: [ 0, 1, 2, 3, 4 ]
