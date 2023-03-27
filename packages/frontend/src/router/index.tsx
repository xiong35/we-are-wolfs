import loadable from "@loadable/component";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = loadable(() => import("../pages/Home"));
const CreateRoom = loadable(() => import("../pages/CreateRoom"));
const JoinRoom = loadable(() => import("../pages/JoinRoom"));
const WaitRoom = loadable(() => import("../pages/WaitRoom"));
const NoMatch = loadable(() => import("../pages/NoMatch"));
const Play = loadable(() => import("../pages/Play"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/createRoom",
    element: <CreateRoom />,
  },
  {
    path: "/joinRoom",
    element: <JoinRoom />,
  },
  {
    path: "/waitRoom",
    element: <WaitRoom />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);

export const RouteView = () => <RouterProvider router={router} />;
