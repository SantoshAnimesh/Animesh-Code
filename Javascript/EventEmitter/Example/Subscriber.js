import { useEffect, useState } from "react";
import { channel } from "./eventBus";
import "./styles.css";

function Subscriber({}) {
  const [user, setUser] = useState([
    { id: 1, name: "SK", sub: "newVideo", event: "" },
    { id: 2, name: "Animesh", sub: "newVideo", event: "" },
    { id: 3, name: "Ashok", sub: "video", event: "" },
  ]);

  useEffect(() => {
    const handler = (event) => {
      console.log("events", event);
      setUser((prev) =>
        prev?.map((u) =>
          u?.sub === event.event ? { ...u, event: event.message } : u
        )
      );
      //   setNotification(`🔔 ${name} received: ${video}`);
    };

    channel.on("newVideo", handler);

    return () => {
      channel.off("newVideo", handler);
    };
  }, []);

  console.log("user", user);

  return (
    <div>
      {user?.map((u) => {
        return (
          <div key={u?.id} className="event-box">
            <p>
              {u?.name}: {u?.sub}
            </p>
            <p>Event: {u?.event}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Subscriber;
