
function checkInclusion(s1, s2) {
    let freq = new Map();

    for(let i = 0; i< s1.length; i++){
        let char = s1[i];
        freq.set(char,(freq.get(char) || 0) + 1);
    }

    let count = s1.length;
    let left = 0;

    for(let right = 0; right< s2.length; right++){
        let char = s2[right];
        freq.set(char, (freq.get(char) || 0) -1);
        if(freq.get(char) >= 0) {
            count--;
        }

        if(count === 0) {
            return true;
        }

        if(right-left+1 >= s1.length){
            let leftChar = s2[left];
            if(freq.get(leftChar) >= 0){
                count++;
            };
            freq.set(leftChar,freq.get(leftChar) +1);
            left++;
        }
    }
    return false;
};

console.log(checkInclusion("ab","eidbaooo"); // true

// ---------- Time Complexity ---------------
Case	       Time	      Space
Best	       O(m)	      O(m) (or O(1) for lowercase letters)
Average	     O(m + n)	  O(m) (or O(1) for lowercase letters)
Worst	       O(m + n)   O(m) (or O(1) for lowercase letters)

