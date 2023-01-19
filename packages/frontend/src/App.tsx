import { useState } from "react";
import { UseMenu } from "./components/UseMenu";
import "./index.less";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <UseMenu onCancel={() => console.log(12)}>123123 </UseMenu>
    </div>
  );
}

export default App;
