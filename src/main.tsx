import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { stripInjectedDevToolbars } from "./lib/stripInjectedDevToolbars";

stripInjectedDevToolbars();

createRoot(document.getElementById("root")!).render(<App />);
