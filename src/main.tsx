import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddTransaction } from "./components/addTransaction.tsx";
import { Account } from "./cadence/account.tsx";

const router = createBrowserRouter([
  {
    path: "/addTransaction",
    element: <AddTransaction />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/account",
    element: <Account/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
