import loadable from "@loadable/component";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = loadable(() => import("../pages/Home"));
const CreateRoom = loadable(() => import("../pages/CreateRoom"));
const NoMatch = loadable(() => import("../pages/NoMatch"));

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
    path: "*",
    element: <NoMatch />,
  },
]);

export const RouteView = () => <RouterProvider router={router} />;
