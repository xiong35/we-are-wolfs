import { computed, signal } from "@preact/signals-react";
import { useState } from "react";
import { Btn } from "./components/Btn";
import { Dialog } from "./components/Dialog";
import { UseMenu } from "./components/UseMenu";
import "./index.less";
import { showDialog } from "./signals/dialog";

const list = signal(1);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <Dialog></Dialog>
      <Btn disabled>123</Btn>
      <Btn>123456</Btn>
      <Btn onClick={() => showDialog(Math.random().toString(), 2)}>
        啊实 打实的
      </Btn>
      <Btn
        onClick={() => {
          list.value++;
        }}
      >
        确定
      </Btn>

      <p>list: {JSON.stringify(list.value)}</p>
    </div>
  );
}

export default App;
