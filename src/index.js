import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ThemeContextProvider from "./contexts/ThemeContext";

// es5
import "./i18n";

ReactDOM.render(
   <React.StrictMode>
      <Suspense fallback="loading">
         <ThemeContextProvider>
            <App />
         </ThemeContextProvider>
      </Suspense>
   </React.StrictMode>,
   document.getElementById("root")
);
