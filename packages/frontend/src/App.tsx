import { Dialog } from "./components/Dialog";
import "./index.less";
import { RouteView } from "./router";

function App() {
  return (
    <div className="container">
      <RouteView />
      <Dialog />
    </div>
  );
}

export default App;
