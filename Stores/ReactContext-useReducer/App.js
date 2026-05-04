import React from "react";
import "./style.css";
import {Display} from "./components/Display.js";
import {UpdateProfile} from "./components/ActionButton.js";

export default function App() {
  return (
    <div>
      <Display />
      <UpdateProfile />
    </div>
  );
}
