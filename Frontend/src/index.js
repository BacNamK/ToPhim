import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BgProvider from "./Components/BackgroundGlobal/Background";
import ItemOutlet from "./Components/BackgroundGlobal/ItemOutlet";

import "./index.css";

import reportWebVitals from "./reportWebVitals";
import Home from "./Page/Home/Home";
import ReLog from "./Page/Register&Login/Register&Login";
import Manager from "./Page/Manager/Manager";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BgProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<ItemOutlet />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="join" element={<ReLog />}></Route>
          <Route path="manager" element={<Manager />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </BgProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
