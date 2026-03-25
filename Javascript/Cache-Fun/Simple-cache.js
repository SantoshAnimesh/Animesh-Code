------ cache function for array sum -----
function createSumCache() {
    const cache = new Map(); // Using Map for better performance

    return function(arr) {
        const key = arr.toString(); // Convert array to string as a unique key

        if (cache.has(key)) {
            console.log("Returning from cache...");
            return cache.get(key);
        }

        const sum = arr.reduce((acc, num) => acc + num, 0);
        cache.set(key, sum);
        console.log("Computed and cached...");
        return sum;
    };
}

// Usage
const cachedSum = createSumCache();

console.log(cachedSum([1, 2, 3, 4])); // Computed and cached... 10
console.log(cachedSum([1, 2, 3, 4])); // Returning from cache... 10
console.log(cachedSum([5, 5, 5])); // Computed and cached... 15
console.log(cachedSum([5, 5, 5])); // Returning from cache... 15
