import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "./route";
import MainPage from "../pages/MainPage";
import NotePage from "../pages/NotePage";

export const router = createBrowserRouter([
  {
    path: PATH.MAIN,
    element: <MainPage />,
  },
  {
    path: PATH.NOTE,
    element: <NotePage />,
  },
  {
    path: PATH.NOTE_ID,
    element: <NotePage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
