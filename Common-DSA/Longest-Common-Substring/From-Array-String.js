
// --------- Better approach ---------
function longestCommonPrefix(strs) {
  if (!strs.length) return "";

  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== strs[0][i]) {
        return strs[0].slice(0, i);
      }
    }
  }

  return strs[0];
}
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
Optimized Complexity
Time → O(n * m) ✅
Space → O(1)

// ------ Code Not Optimal---------
function longestCommonPrefix(strs) {
  if (!strs.length) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}
Example
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"

-------Time Complexity -------> 

n = number of strings
m = length of the shortest string
Worst Case:
For each string → n
In worst case, we shrink prefix character by character → up to m
Each startsWith(prefix) takes O(m)
So:
Time = O(n * m * m) = O(n * m²)
Best Case:
If all strings already match → only one check per string
O(n * m)
