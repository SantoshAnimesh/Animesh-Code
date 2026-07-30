// ------------ Optimal Solution --------------

function longestOnes(nums,k) {
  let max = 0;
  let count = 0;
  let left = 0;
  
  for(let right = 0; right< nums.length; right++) {
    if(nums[right] === 0) {
      count++;
    }
    
    if(count > k){ 
      if(nums[left] === 0){
        count--;
      }
      left++;
    }
    max = Math.max(right -left+1);
  }
  return max
}

let nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2;
                                
console.log(longestOnes(nums,k)) // 6

Complexity:
Case	    Time	   Space
Best	    O(n)	   O(1)
Average	  O(n)	   O(1)
Worst	    O(n)	   O(1)


// ------Some better Solution ---------
function longestOnes(nums,k) {
  let max = 0;
  let count = 0;
  let left = 0;
  
  for(let right = 0; right< nums.length; right++) {
    if(nums[right] === 0) {
      count++;
    }
    
    while(count > k){
      if(nums[left] === 0){
        count--;
      }
      left++;
    }
    max = Math.max(right -left+1);
  }
  return max
}

let nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2;
console.log(longestOnes(nums,k)) // 6

Time Complexity : O(2n) 

// ------------ Brute Force Approach ------------------
function longestOnes(nums,k) {
  let max = 0
  
  for(let left = 0; left < nums.length; left++){
    let count = 0;
    
    for(let right = left; right < nums.length; right++){
      if(nums[right] === 0){
        count++;
      }
      if(count > k) {
        max = Math.max(max, right -left );
        break;
      }
    }
  }
  
  return max
}

let nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2;
console.log(longestOnes(nums,k)) // 6

Time-Complexity: O(n) ; 


// -----------Examples -----------------
Example 1:

Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
  
Example 2:
Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
