import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext";
import { SampleProvider } from "./context/SampleContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SampleProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </SampleProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
