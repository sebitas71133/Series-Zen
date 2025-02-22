//Main routes

import { createBrowserRouter } from "react-router-dom";
import SeriesPage from "../pages/SeriesPage";
import CatalogPage from "../pages/CatalogPage";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFoundPage from "../components/NotFoundPage";
import HomePage from "../pages/HomePage";
import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

import LoginPage from "../components/auth/LoginPage";
import Account from "../components/auth/Account";
import LoginDemoPage from "../components/auth/LoginDemoPage";

const routes = [
  //RUTAS PUBLICAS
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage></HomePage> },
      { path: "login", element: <LoginPage /> },
      { path: "loginDemo", element: <LoginDemoPage /> },
    ],
    errorBoundary: <ErrorBoundary />,
  },
  //RUTAS PRIVADA
  {
    path: "/app",
    element: <ProtectedLayout />,
    children: [
      { path: "series", element: <CatalogPage></CatalogPage> },
      { path: "series/:slug", element: <SeriesPage></SeriesPage> },
      { path: "profile", element: <Account></Account> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
    v7_startTransition: true,
  },
});

export default router;
