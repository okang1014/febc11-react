import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 리액트 쿼리를 사용하기 위한 초기 설정
const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* react query 를 사용할 컴포넌트를 QueryClientProvider 로 감싸기 */}
    {/* client prop 을 전달 */}
    <QueryClientProvider client={client}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
