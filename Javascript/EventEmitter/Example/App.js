import { useState } from "react";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";

function App() {

  return (
    <div>
      <h1>YouTube Notification System</h1>
      <Publisher />
      <hr />
      <Subscriber />
    </div>
  );
}

export default App;
