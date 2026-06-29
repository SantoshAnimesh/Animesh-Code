
function findMaxAverage(nums, k) {
    let windowSum = 0;

    // First window
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }

    let maxSum = windowSum;

    // Slide the window
    for (let right = k; right < nums.length; right++) {
        windowSum += nums[right];
        windowSum -= nums[right - k];

        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum / k;
}

console.log(findMaxAverage([1,12,-5,-6,50,3],2)) // 26.5

Complexity-Type	    Best-Case	 Average-Case	 Worst-Case	
Time Complexity	    O(n)	     O(n)	         O(n)	
Space Complexity	  O(1)	     O(1)	         O(1)

// -------- Example ----------
nums = [1,12,-5,-6,50,3]
k = 4
  
[1,12,-5,-6]  -> sum = 2   -> avg = 0.5
[12,-5,-6,50] -> sum = 51  -> avg = 12.75  ✅
[-5,-6,50,3]  -> sum = 42  -> avg = 10.5

Maximum average = 12.75

// ----------------------------


function findMaxAverage(nums, k) {
    let windowSum = 0;
  
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }

    let maxSum = windowSum;
    let startIndex = 0;

    for (let right = k; right < nums.length; right++) {
        windowSum += nums[right];
        windowSum -= nums[right - k];

        if (windowSum > maxSum) {
            maxSum = windowSum;
            startIndex = right - k + 1;
        }
    }

    return nums.slice(startIndex, startIndex + k);
}

console.log(findMaxAverage([1,12,-5,-6,50,3],4)) // [ 12, -5, -6, 50 ]

// --------- Time and Space Complexity ------
Time Complexity:   O(n)
Space Complexity:  O(k)

