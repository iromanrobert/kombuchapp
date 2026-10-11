import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  // public pages, no sidebar
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  // pages inside the app shell
  {
    path: "/",
    children: [
      { index: true, element: <DashboardPage /> },
      // add more pages here as tickets are built
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);

export default router;
