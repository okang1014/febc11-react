import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // RecoilRoot 는 recoil atom 의 상태값을 사용할 수 있는 범위 지정, App 컴포넌트는 atom 에 지정된 상태값 사용 가능
  <RecoilRoot>
    <App />
  </RecoilRoot>
  // </StrictMode>
);
