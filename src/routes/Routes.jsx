//Main routes

import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SeriesPage from "../pages/SeriesPage";
import CatalogPage from "../pages/CatalogPage";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFoundPage from "../components/NotFoundPage";
import HomePage from "../pages/HomePage";

const routes = [
  {
    path: "/",
    element: (
      <>
        <Navbar></Navbar>
        <main>
          <Outlet></Outlet>
        </main>
      </>
    ),
    children: [
      { index: true, element: <HomePage></HomePage> },
      { path: "home", element: <HomePage></HomePage> },
      { path: "series", element: <CatalogPage></CatalogPage> },
      { path: "series/:slug", element: <SeriesPage></SeriesPage> },
      // { path: "/", element: <CatalogPage></CatalogPage> },
      { path: "*", element: <NotFoundPage></NotFoundPage> },
    ],
    errorBoundary: <ErrorBoundary />,
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
