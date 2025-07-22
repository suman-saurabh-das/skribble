import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// components
import App from "./App.tsx";
import { ScribbleContextProvider } from "./context/ScribbleContext";
import { UserContextProvider } from "./context/UserContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <ScribbleContextProvider>
        <App />
      </ScribbleContextProvider>
    </UserContextProvider>
  </StrictMode>
);
