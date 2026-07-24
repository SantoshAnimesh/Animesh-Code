
function findAllAnagram(s,s2) {
  const mapVal = new Map();
  for(let i = 0; i < s2.length; i++){
    mapVal.set(s2[i],(mapVal.get(s2[i]) || 0) + 1);
  }
  
  let count = s2.length; 
  let left = 0;
  const result = [];
  
  for(let right = 0; right< s.length; right++) {
    let key= s[right];
    mapVal.set(key, (mapVal.get(key) || 0) -1);
    if(mapVal.get(key) >= 0){
      count--;
    }
    
    if(right -left + 1 >= s2.length){
      const leftKey = s[left]
      if(count === 0){
        result.push(left)
      }
      
      mapVal.set(leftKey,mapVal.get(leftKey) +1);
       if(mapVal.get(leftKey) > 0){
        count++;
      }
      left++;
    }
  }
  
  return result;
}

console.log(findAllAnagram("cbaebabacd","abc")); // [ 0, 6 ]

Complexity
Scenario	        Time	        Space (excluding output)	   Space (including output)
Best Case	        O(n + m)	    O(m)	                       O(n + m) ≈ O(n)
Average Case	    O(n + m)	    O(m)	                       O(n + m) ≈ O(n)
Worst Case	      O(n + m)	    O(m)	                       O(n + m) ≈ O(n)
