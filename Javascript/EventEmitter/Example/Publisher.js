import { channel } from "./eventBus";
import { useState } from "react";

function Publisher() {
  const [message, setMessage] = useState("");
  const uploadVideo = () => {
    channel.emit("newVideo", "Node.js EventEmitter Complete Tutorial");
  };

  const handleSend = () => {
    channel.emit("newVideo", { event: "newVideo", message: message });
    setMessage("");
  };

  return (
    <div className="">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Publisher;
