// Find the longest continuous part of the string that contains no more than k unique characters.

const logestSubStringAtMostKDistinct = (str: String, k: any) => {
  const lastSeen = new Map();
  let left = 0;
  let MaxWinDow = 0;

  for (let right = 0; right < str.length; right++) {
    const char = str[right];
    lastSeen.set(char, (lastSeen.get(char) || 0) + 1);

    while (lastSeen.size > k) {
      lastSeen.set(str[left], lastSeen.get(str[left]) - 1);
      if (lastSeen.get(str[left]) === 0) {
        lastSeen.delete(str[left]);
      }
      left++;
    }

    MaxWinDow = Math.max(MaxWinDow, right - left + 1);
  }

  return MaxWinDow;
};

console.log(logestSubStringAtMostKDistinct("aabbccc", 2)); // 5

// -----Complexity Summary ------
Case	         Time	   Space
Best-Case	     O(n)	   O(k)
Average-Case	 O(n)	   O(k)
Worst-Case	   O(n)  	 O(k)


// ---------- Explanation Questions -------------
Longest Substring with At Most K Distinct Characters (Simple Explanation)

You are given:

A string.
A number k.

Your task is to find the length of the longest continuous substring that contains at most k different characters.

Example
String = "eceba"
k = 2

Possible substrings:

"ec" → 2 distinct characters ✅
"ece" → 2 distinct characters (e, c) ✅
"eceb" → 3 distinct characters (e, c, b) ❌

So the longest valid substring is:

"ece"

Answer:

Length = 3
In one sentence

Find the longest continuous part of the string that contains no more than k unique characters.
