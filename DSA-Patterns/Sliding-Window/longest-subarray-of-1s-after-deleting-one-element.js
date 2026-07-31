
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
