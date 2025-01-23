import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.jsx";
import Apptheme from "./theme/Apptheme.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import UserProvider from "./providers/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <Provider store={store}>
    <Apptheme>
      <UserProvider>
        <RouterProvider
          router={router}
          future={{
            v7_fetcherPersist: true,
            v7_startTransition: true,
          }}
        >
          <App />
        </RouterProvider>
      </UserProvider>
    </Apptheme>
  </Provider>
  //</StrictMode>,
);
