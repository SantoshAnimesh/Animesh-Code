
function minSubArrayLen(nums, target) {
    let left = 0;
    let sum = 0;
    let minLength = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        // Shrink the window while the condition is satisfied
        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}

console.log(minSubArrayLen([2,3,1,2,4,3],7)); // 2

// --------- Complexity ----------
Case	      Time	   Space
Best	      O(n)	   O(1)
Average	    O(n)	   O(1)
Worst	      O(n)	   O(1)


// ---------- With return nums ----------------
function minSubArrayLen(target, nums) {
    let left = 0;
    let sum = 0;
    let minLength = Infinity;

    let start = 0;
    let end = 0;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum >= target) {
            const windowSize = right - left + 1;

            if (windowSize < minLength) {
                minLength = windowSize;
                start = left;
                end = right;
            }

            sum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? [] : nums.slice(start, end + 1);
}

console.log(minSubArrayLen(7, [2,3,1,2,4,3])); // [4,3]

// --------- Complexity ----------
Case	      Time	   Space
Best	      O(n)	   O(1)
Average	    O(n)	   O(1)
Worst	      O(n)	   O(1)



