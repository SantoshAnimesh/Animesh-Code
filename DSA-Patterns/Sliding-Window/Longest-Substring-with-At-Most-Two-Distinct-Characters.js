

function longestSubstringWithAtLeatTwoDistinct(s) {
    let left = 0;
    let maxLength = 0;

    const freq = new Map();

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        freq.set(char, (freq.get(char) || 0) + 1);

        while (freq.size > 2) {
            const leftChar = s[left];

            freq.set(leftChar, freq.get(leftChar) - 1);

            if (freq.get(leftChar) === 0) {
                freq.delete(leftChar);
            }

            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

console.log(longestSubstringWithAtLeatTwoDistinct("aabbccc")); // 5 


// -----------------------------------------------
Time Complexity: O(n)
Space Complexity: O(K)

Complexity	Best-Case	Worst-Case	 Reason
Time	     O(n)	     O(n)	     right moves n times, left moves at most n times.
Space	     O(1)	     O(1)	     The map holds at most 3 distinct characters (2 allowed + 1 before shrinking).
