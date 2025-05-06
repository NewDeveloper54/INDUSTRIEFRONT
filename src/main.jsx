import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { Provider } from "@/components/ui/provider"



const rootElement = document.querySelector("#root");
const root = createRoot(rootElement);

root.render(
  <Provider>
    < App/>
  </Provider>
);