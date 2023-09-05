import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Router />
        </Provider>
    </BrowserRouter>
);
