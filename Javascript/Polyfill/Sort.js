Array.prototype.mySort = function(compareFn) {
  if (typeof compareFn !== "function") {
    compareFn = (a, b) => String(a) > String(b) ? 1 : -1;
  }

  const quickSort = (arr) => {
    if (arr.length <= 1) return arr;

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (compareFn(arr[i], pivot) < 0) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  const sorted = quickSort(this);

  // mutate original array like real sort
  for (let i = 0; i < sorted.length; i++) {
    this[i] = sorted[i];
  }

  return this;
};

// ----------- Test Caes ---------------------
const arr = [5, 2, 9, 1, 7];
arr.mySort((a, b) => a - b);
console.log(arr);

:: Output: [1, 2, 5, 7, 9]

--------- Time Complexity ----------------

| Case    | Time               |
| ------- | ------------------ |
| Average | O(n log n)         |
| Worst   | O(n²)              |
| Space   | O(log n) recursion |


  
