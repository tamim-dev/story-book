import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ApiProvider } from "./providers/api-provider";
import {
  applyThemeToDocument,
  getStoredTheme,
  getSystemTheme,
} from "./lib/theme";

applyThemeToDocument(getStoredTheme() ?? getSystemTheme());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApiProvider>
        <App />
      </ApiProvider>
    </BrowserRouter>
  </StrictMode>,
);
