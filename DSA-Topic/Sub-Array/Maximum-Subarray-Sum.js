

function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// Example
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Output: 6


// --------- With also return index -------------
function maxFind(num){
  let currentSum = num[0];
  let maxSum = num[0];
  let start = 0;
  let end = 0;
  
  for(let i=1; i< num.length;i++){
    if(num[i] > currentSum + num[i]){
      start = i;
      currentSum = num[i];
    } else {
      currentSum = currentSum + num[i]
      // end = i;
    }
    
    if(currentSum > maxSum){
      maxSum = currentSum;
      end = i
    }
    
  }
  
  return {max: maxSum, start: start,end:end}
}

const num = [1,0,-6,2,-2,4,-1,-3,0,1];
console.log(maxFind(num)) // { max: 4, start: 3, end: 5 }

