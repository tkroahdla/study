import { useState } from "react";

function App() {
  const [counter, satValue] = useState(0);
  const onClick = () => satValue((prev) => prev + 1);
  console.log("call an api");
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
