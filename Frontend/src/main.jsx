import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { DarkModeContextProvider } from "./pages/Admin/context/DarkModeContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <AuthContextProvider>
  //   <DarkModeContextProvider>
  //     <App />
  //   </DarkModeContextProvider>
  // </AuthContextProvider>
  <React.StrictMode>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>
);
