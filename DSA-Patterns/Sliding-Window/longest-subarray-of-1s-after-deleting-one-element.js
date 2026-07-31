
 function longestSubarray(nums) {
    let max = 0;
    let left = 0;
    let zeroCount = 0;

    for(let right = 0; right < nums.length; right++) {
        if(nums[right] === 0) {
            zeroCount++;
        }
        while(zeroCount > 1) {
            if(nums[left] === 0) {
                zeroCount--;
            }
            left++;
        }
        max = Math.max(max, right-left);
    }
    return max
};

console.log(longestSubarray([0,1,1,1,0,1,1,0,1])) // 5

// -------- Time Complexity -----------
case: Best Wrost: O(n) 


// ----------- Examples --------------------
Example 1:
Input: nums = [1,1,0,1]
Output: 3
Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.
 
Example 2:
Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].

Example 3:
Input: nums = [1,1,1]
Output: 2
Explanation: You must delete one element.
