import Child from "./Child";
import "./styles.css";
import ToastrContainer from "./Toastr/ToastrContainer";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <ToastrContainer />
      <Child />
    </div>
  );
}
