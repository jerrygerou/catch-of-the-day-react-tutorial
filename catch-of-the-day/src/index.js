import React from "react";
import { render } from "react-dom";
import StorePicker from "./components/StorePicker";
import App from "./components/App";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import Order from "./components/Order";
import "./css/style.css";

render(<App />, document.querySelector("#main"));
