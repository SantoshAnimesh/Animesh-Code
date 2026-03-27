Debounce is a technique used to delay the execution of a function u
ntil after a certain amount of time has passed since the last time it was called.

👉 In simple words:
If a function is called repeatedly, debounce ensures it runs only once after the calls stop.

🎯 Why we use it
To avoid unnecessary function calls and improve performance, especially for events that fire frequently.

// 💡 Common Use Cases---
1. 🔍 Search Input (Most asked in interviews)
When user types in a search box
API call is made only after user stops typing

👉 Without debounce → API called on every keystroke
👉 With debounce → API called once after typing stops
