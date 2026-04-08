// Print MMinum sub Array whose sum of target sum

function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    // shrink window when condition satisfied
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++; 
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
console.log(minSubArrayLen(7, [0,3,1,2,4,3])) // 2

// ------ With index prient -----------
function minSubArrayIndices(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;
  let result = [-1, -1];

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        result = [left, right];
      }
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? [] : { minLen, indices: result };
}


console.log(minSubArrayIndices(7, [0,3,1,2,4,3])) // { minLen: 2, indices: [ 4, 5 ] }
