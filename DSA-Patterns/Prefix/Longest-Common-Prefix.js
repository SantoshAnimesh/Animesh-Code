
// ---------- Optimal Solution ------------
function longestCommonPrefix(s) {
  if (!s.length) return "";

  for (let i = 0; i < s[0].length; i++) {
    const char = s[0][i];

    for (let j = 1; j < s.length; j++) {
      if (s[j][i] !== char) {
        return s[0].slice(0, i);
      }
    }
  }

  return s[0];
}

console.log(longestCommonPrefix(["flower", "flow", "flight"])) // fl

// ---------- Time/Space ---------------
Case	  Time	     Space
Best	  O(n)	     O(1)
Worst	  O(n × m)	 O(1)

Time complexity is O(n) in the best case and O(n × m) in the worst case. Space complexity is O(1) in both cases.
