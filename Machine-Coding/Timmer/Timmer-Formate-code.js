
 const formatTime = (time) => {
    const hh = String(Math.floor(time / 3600)).padStart(2, "0");
    const mm = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const ss = String(time % 60).padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  };

// --------With Current Time ------------>
 useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");

      setTime(`${hh}:${mm}:${ss}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

// ------------Current Time In Seconds ------------->
function getCurrentTimeInSeconds() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return (hours * 3600) + (minutes * 60) + seconds;
}
console.log(getCurrentTimeInSeconds()); 
e.g. 13:30:15 → 48615 seconds


// --------AM/PM ------------->
  let hh = now.getHours();
const ampm = hh >= 12 ? "PM" : "AM";
hh = hh % 12 || 12;

// --------  Custom Format ----------
  ✅ Custom Format
const d = new Date();
const formatted = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`;
👉 2026-03-28 10:30:15

// -------------Date Formats — Short Notes ---------------
1. Default Date Object
const now = new Date();
console.log(now);

👉 Output:

Sat Mar 28 2026 10:30:15 GMT+0530 (India Standard Time)
🧾 2. Common Date Formats
✅ ISO Format (Most Important)
new Date().toISOString();

👉 2026-03-28T05:00:15.000Z

✔️ Used in APIs / backend / databases

✅ YYYY-MM-DD
const d = new Date();
const formatted = d.toISOString().split("T")[0];

👉 2026-03-28

✅ DD-MM-YYYY
const d = new Date();
const formatted = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;

👉 28-3-2026

👉 With padding:

String(d.getDate()).padStart(2,"0")

👉 28-03-2026

✅ MM/DD/YYYY (US Format)
new Date().toLocaleDateString("en-US");

👉 03/28/2026

✅ DD/MM/YYYY (India Format)
new Date().toLocaleDateString("en-IN");

👉 28/03/2026

⏱️ 3. Time Formats
✅ HH:MM:SS (24-hour)
new Date().toLocaleTimeString("en-GB");

👉 10:30:15

✅ HH:MM:SS AM/PM (12-hour)
new Date().toLocaleTimeString("en-US");

👉 10:30:15 AM

📅 4. Full Date + Time
✅ Locale String
new Date().toLocaleString("en-IN");

👉 28/03/2026, 10:30:15 am

✅ Custom Format
const d = new Date();

const formatted = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`;

👉 2026-03-28 10:30:15

🔢 5. Timestamp (Very Important)
✅ Milliseconds
Date.now();

👉 1711600000000

✅ Seconds
Math.floor(Date.now() / 1000);

👉 1711600000

🌍 6. UTC vs Local
✅ UTC
new Date().toUTCString();

👉 Sat, 28 Mar 2026 05:00:15 GMT

✅ Local
new Date().toString();
📆 7. Custom Formatting (Manual)
const d = new Date();

const day = String(d.getDate()).padStart(2,"0");
const month = String(d.getMonth() + 1).padStart(2,"0");
const year = d.getFullYear();

console.log(`${day}/${month}/${year}`);
⚡ 8. Useful Methods
getFullYear()   // 2026
getMonth()      // 0–11
getDate()       // 1–31
getDay()        // 0–6 (Sun–Sat)
getHours()      // 0–23
getMinutes()    // 0–59
getSeconds()    // 0–59
🎯 Interview Summary (Golden Line)

“In JavaScript, dates are usually handled using ISO format or timestamps internally, and formatted using toLocaleString or custom logic depending on UI requirements.”

🚀 Pro Tip (Important)
Prefer toLocaleString() for real apps (handles timezone automatically)
Use ISO (toISOString) for backend communication
Always handle timezone issues in production apps
