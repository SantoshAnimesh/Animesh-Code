import { useEffect, useState, useRef } from "react";
import { SvgComponent } from "./SvgComponent.js";
// import "./styles.css";

export default function Star() {
  const [users, setUsers] = useState([]);
  // const [userClickCount,setUserClickCount] = useState(())
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setUsers((prev) => {
        const userObj = {
          userId: Math.floor(Math.random() * 1000),
          rating: Math.ceil(Math.random() * 5),
        };
        const currentUser = [...prev, userObj];
        if (currentUser.length >= 30) {
          clearInterval(timerRef.current);
        }

        return currentUser;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const total = users.reduce((acc, u) => acc + u.rating, 0);
  const averageRating = users.length ? total / users.length : 0;

  const getStarColor = (rating) => {
    if (rating < 2) return "#ff4d4f"; // red
    if (rating < 3.5) return "#fa8c16"; // orange
    if (rating < 4.5) return "#fadb14"; // yellow
    return "#fa8c16";
  };

  const starColor = getStarColor(averageRating);

  const getStarPercent = (index) => {
    const fill = Math.max(0, Math.min(1, averageRating - index));
    return fill * 100;
  };

  console.log(averageRating);

  return (
    <div className="star-container">
      <h2>{averageRating.toFixed(2)}</h2>
      <div className="stars">
        {[0, 1, 2, 3, 4].map((_, index) => (
          <SvgComponent
            key={index}
            percent={getStarPercent(index)}
            color={starColor}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
