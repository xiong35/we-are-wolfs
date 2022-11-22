import { useState } from "react";
import styles from "./index.module.less";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className={styles.foo}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
