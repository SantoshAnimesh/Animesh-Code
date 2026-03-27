
--------- js --------
const div = document.getElementById("list");
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 2, 3, 4, 5, 6, 7, 8, 9, 0];

arr.forEach((item) => {
  const p = document.createElement("p");
  p.textContent = `Item ${item}`;
  div.appendChild(p);
});

// Throttle function should be outside so it can be accessed globally
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// Function to be throttled
function handleScroll() {
  console.log("Scroll event triggered at", new Date().toLocaleTimeString());
}

// Throttled version of the function, allowing execution only once every 1 second
const throttledScroll = throttle(handleScroll, 1000);

// Attaching the throttled function to the scroll event
div.addEventListener("scroll", throttledScroll);


// --------Html--------
-------- html -------- 
<!DOCTYPE html>
<html>
  <head>
    <title>Sandbox</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="src/styles.css" />
  </head>

  <body>
    <h1>HTML/CSS/JS Scratch Template</h1>
    <div
      id="list"
      style="width: 200px; height: 200px; overflow: scroll; border: 1px solid red;"
    >
      Hello
    </div>
    <script src="src/index.js"></script>
  </body>
</html>
