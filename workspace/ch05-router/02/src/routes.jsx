import Page1 from "./Page1";
import Home from "./Home";
import Page2 from "./Page2";
import { createBrowserRouter, Navigate } from "react-router-dom";
// react-router-dom 에서 browser router import
import Layout from "./Layout"; // 공통 레이아웃 지정

// createBrowerRouter 첫번째 인자는 라우팅 규칙 배열
const router = createBrowserRouter(
  [
    // {
    //   // path 는 경로, element 는 렌더링할 컴포넌트
    //   path: "/",
    //   element: <Home />,
    // },
    // {
    //   path: "/page1",
    //   element: <Page1 />,
    // },
    // {
    //   path: "/page2",
    //   element: <Page2 />,
    // },
    {
      // 페이지들을 연관된 기능별로 분류할 수 있음
      path: "/",
      element: <Layout />,
      children: [
        // index 는 기본으로 표시되는 페이지
        // { index: true, element: <Home /> },
        { index: true, element: <Navigate to="/home" /> }, // URI 뒤에 아무것도 없으면 자동으로 home 으로 이동
        { path: "home", element: <Home /> },
        { path: "page1", element: <Page1 /> },
        { path: "page2", element: <Page2 /> },
        { path: "page3", element: <Navigate to="/page1" /> }, // page3 URI 입력 시 page1 이동
        { path: "page4", element: <Page1 /> }, // page4 URI 입력 시 내용물만 Page 1에 해당되는 내용 출력
      ],
    },
  ],
  {
    future: {
      // 현재 ver 6. ver 7 의 기능 따로 지정하여 콘솔에 에러 메세지 보지 않기 위해 추가
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
