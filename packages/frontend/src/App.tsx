import { useState } from "react";
import { Btn } from "./components/Btn";
import { UseMenu } from "./components/UseMenu";
import "./index.less";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <Btn disabled>123</Btn>
      <Btn>123456</Btn>
      <Btn>啊实 打实的</Btn>
      <Btn>确定</Btn>
    </div>
  );
}

export default App;
