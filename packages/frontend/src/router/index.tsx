import loadable from "@loadable/component";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const Home = loadable(() => import("../pages/Home"));
const CreateRoom = loadable(() => import("../pages/CreateRoom"));
const NoMatch = loadable(() => import("../pages/NoMatch"));

// export const RouteView = () => {
//   return (
//     <Routes>
//       <Route index element={<Home />} />
//       <Route path="/create-room" element={<CreateRoom />} />
//       <Route path="*" element={<NoMatch />} />
//     </Routes>
//   );
// };

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create-room",
    element: <CreateRoom />,
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);

export const RouteView = () => <RouterProvider router={router} />;
