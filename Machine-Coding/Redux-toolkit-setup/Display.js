import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import {
  decrementCounter,
  incrementCounter,
} from "./features/Couter/CouterSlice.js";

function Display() {
  const counter = useSelector((state) => state?.counter, shallowEqual);
  const dispatch = useDispatch();
  console.log("called display", counter);
  return (
    <div>
      <h1>Hi Welcome</h1>
      <h2>{counter?.counterVal}</h2>

      <div className="action-btn">
        <button onClick={() => dispatch(incrementCounter(2))}>Increment</button>
        <button onClick={() => dispatch(decrementCounter(2))}>Decrement</button>
      </div>
    </div>
  );
}

export default Display;
