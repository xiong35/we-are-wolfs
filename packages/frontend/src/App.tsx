import classNames from "classnames";
import { Dialog } from "./components/Dialog";
import "./index.less";
import { RouteView } from "./router";

function App() {
  return (
    <div className={classNames("w-container", "light")}>
      <div className="w-main">
        <RouteView />
        <Dialog />
      </div>
    </div>
  );
}

export default App;
