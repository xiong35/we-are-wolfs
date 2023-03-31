import classNames from "classnames";
import { Dialog } from "./components/Dialog";
import "./index.less";
import { RouteView } from "./router";
import { date } from "./signals/game";

function App() {
  return (
    <div
      className={classNames(
        "w-container",
        date.value % 2 === 0 ? "dark" : "light"
      )}
    >
      <div className="w-main">
        <RouteView />
        <Dialog />
      </div>
    </div>
  );
}

export default App;
