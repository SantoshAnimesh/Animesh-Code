

function longestSubStringNonRepeated(str) {
    let left = 0;
    let maxLength = 0;
    let startIndex = 0;

    const lastSeen = new Map();

    for (let right = 0; right < str.length; right++) {
        const char = str[right];

        if (lastSeen.has(char) && lastSeen.get(char) >= left) {
            left = lastSeen.get(char) + 1;
        }

        lastSeen.set(char, right);

        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            startIndex = left;
        }
    }

    return [maxLength, str.slice(startIndex, startIndex + maxLength)];
}

console.log(longestSubStringNonRepeated("abbae")); // [ 3, 'bae' ]
