import { createBrowserRouter } from "react-router-dom";

import Layout from "@components/layout";
import MainPage from "@pages/index";

const router = createBrowserRouter([
  {
    // localhost 까지 입력된 경우, Layout 컴포넌트 표시
    path: "/",
    element: <Layout />,
    children: [
      // index 페이지는 MainPage 컴포넌트 표시 Layout 컴포넌트의 outlet 위치에 삽입
      { index: true, element: <MainPage /> },
      // { path: 'page1', element: <Page1 /> },
    ],
  },
]);

export default router;
