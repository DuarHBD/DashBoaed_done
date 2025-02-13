import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // เพิ่มไฟล์ CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { LanguageProvider } from "./datacontext/Langprovider";
import DataProvider from "./datacontext/Dataformserver"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>
    <DataProvider>
    <LanguageProvider>
    <App />
    </LanguageProvider>
    </DataProvider>
    
    </BrowserRouter>
  </React.StrictMode>
);
