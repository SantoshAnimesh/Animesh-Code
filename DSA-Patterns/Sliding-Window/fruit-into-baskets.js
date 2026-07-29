
// -------- optimal Solution -----------------

function fruitInBacket(fruits) {
    let result = 0;
    let freq = new Map();
    let left = 0;

    for(let right = 0; right< fruits.length; right++) {
        let char = fruits[right];
        freq.set(char, (freq.get(char) || 0) +1);

        while(freq.size > 2) {
            let leftChar = fruits[left];
            freq.set(leftChar, freq.get(leftChar) -1);
            if(freq.get(leftChar) === 0) {
                freq.delete(leftChar);
            }
            left++;
        }
        result = Math.max(result, right - left +1);
    }
    return result;
};

console.log(fruitInBacket([0,1,2,2])); // 3;

-Time Complexity---
Scenario	     Time-Complexity	Space-Complexity
Best-Case	     O(n)	            O(1)
Average-Case	 O(n)	            O(1)
Worst-Case	   O(n)	            O(1)




// -------- Brute Force Approach ----------
function fruitInBacket(fruits) {
  let result = 0;
  
  for(let left = 0; left < fruits.length; left++){
    let freq = new Map();
    let count = 0;
    
    for(let right = left; right < fruits.length; right++){
      let key = fruits[right];
      freq.set(key, (freq.get(key) || 0) +1);
      
      if(freq.size > 2){
        break;
      }
      count++;
    }
    result = Math.max(result, count);
  }
  
  return result;
}

console.log(fruitInBacket([1,2,3,2,2])); // 4;

Time-Complexity-----
Scenario	       Time	   Space
Best-Case	       O(n)	   O(1)
Average-Case	   O(n²)	 O(1)
Worst-Case	     O(n²)	 O(1)



// -------- Examples-------------
Example 1:

Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
  
Example 2:
Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from trees [1,2,2].
If we had started at the first tree, we would only pick from trees [0,1].
  
Example 3:
Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from trees [2,3,2,2].
If we had started at the first tree, we would only pick from trees [1,2].
