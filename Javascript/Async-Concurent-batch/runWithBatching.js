


async function runBatches(tasks, batchSize) {
  const results = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);

    try {
      const batchResults = await Promise.all(
        batch.map((task) => task())
      );
      results.push(...batchResults);
    } catch (err) {
      console.error("Error in batch:", err);
      // Optional: push partial results or throw
      throw err;
    }
  }

  return results;
}


// ------- Examples --------------- >
const tasks = Array.from({ length: 10 }, (_, i) => {
  return () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(i), 1000)
    );
});

runBatches(tasks, 3).then(console.log);

👉 Output (after batches):
[0,1,2,3,4,5,6,7,8,9]

// --------Explain -------------
Important Interview Points
1. ❗ Promise.all Failure Behavior
If one fails → whole batch fails
Interviewer may ask: “How to continue even if some fail?”

👉 Use Promise.allSettled

const batchResults = await Promise.allSettled(
  batch.map((task) => task())
);
2. 🔁 Maintain Order

Your current approach already maintains order because:

You process sequential batches
Push results in sequence
