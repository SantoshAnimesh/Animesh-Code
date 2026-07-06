// ----------- Optimal Solution -----------
// Longest Repeating Character Replacement
function characterReplacement(s, k) {
    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;

    const freq = new Map();

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        freq.set(char, (freq.get(char) || 0) + 1);

        // Highest frequency character in current window
        maxFreq = Math.max(maxFreq, freq.get(char));

        // If replacements needed exceed k, shrink window
        while ((right - left + 1) - maxFreq > k) {
            freq.set(s[left], freq.get(s[left]) - 1);
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

console.log(characterReplacement("AABABBA", 1)); // 4 

// -------- Complexity Summary ---------------
Case	    Time	    Space
Best	    O(n)	    O(1) 
Average	  O(n)	    O(1) 
Worst	    O(n)	    O(1) 



-------- with non Optimal --------------
function longestRepeating(s, k) {
    let max = 0;

    for (let i = 0; i < s.length; i++) {
        let windowLength = 0;
        let remaining = k;
        let char = s[i];

        for (let j = i; j < s.length; j++) {

            if (char !== s[j] && remaining <= 0) {
                windowLength = 0;
                remaining = k;
            }

            windowLength++;
            max = Math.max(max, windowLength);

            if (char !== s[j]) {
                remaining--;
            }
        }
    }

    return max;
}

console.log(longestRepeating("AABABBA", 1)); // 4

// -------- Final Complexity -------------
Case	       Time-Complexity	Space-Complexity
Best	       O(n²)	          O(1)
Average	     O(n²)	          O(1)
Worst	       O(n²)	          O(1)

// ---------- Examples --------------------
Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
