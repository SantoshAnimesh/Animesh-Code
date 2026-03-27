

// --------- js ------------

  function debounce(func, delay = 300) {
    let timerId;
    
    return function(...args) {
        if (timerId) clearTimeout(timerId);
        
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// ---------exmaples ---------->
    // Simulating an API call
    function searchAPI(query) {
        console.log(`Searching for: ${query}`);
        document.getElementById('result').innerText = `Results for: ${query}`;
    }

    // Using debounce to optimize the search function
    const debouncedSearch = debounce(searchAPI, 500);

    // Adding event listener to the input field
    document.getElementById('searchInput').addEventListener('input', (event) => {
        debouncedSearch(event.target.value);
    });
