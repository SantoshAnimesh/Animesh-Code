
function numSubarrayProductLessThanK(nums, k) {
    if (k <= 1) return 0;

    let left = 0;
    let product = 1;
    let count = 0;

    for (let right = 0; right < nums.length; right++) {
        product *= nums[right];

        while (product >= k) {
            product /= nums[left];
            left++;
        }

        count += right - left + 1;
    }

    return count;
}

let nums = [10,5,2,6], k = 100;
console.log(numSubarrayProductLessThanK(nums,k)) // 6

// ---------- Time Complexity ---------- 
Scenario	           Time	   Space
Best-case	           O(n)	   O(1)
Average-case	       O(n)	   O(1)
Worst-case	         O(n)	   O(1)

This is an O(n) time and O(1) space sliding-window solution because each element is added to the window once 
by the right pointer and removed at most once by the left pointer.

// ------------- LeetCode Examples -------------
Example 1:
Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
  
Example 2:
Input: nums = [1,2,3], k = 0
Output: 0

