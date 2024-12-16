import { createBrowserRouter } from "react-router-dom";

import Layout from "@components/layout";
import MainPage from "@pages/index";
import List from "@pages/board/List";
import New from "@pages/board/New";
import Detail from "@pages/board/Detail";
import Edit from "@pages/board/Edit";
import Signup from "@pages/user/Signup";
import Login from "@pages/user/Login";

const router = createBrowserRouter(
  [
    {
      // localhost 까지 입력된 경우, Layout 컴포넌트 표시
      path: "/",
      element: <Layout />,
      children: [
        // index 페이지는 MainPage 컴포넌트 표시 Layout 컴포넌트의 outlet 위치에 삽입
        { index: true, element: <MainPage /> },
        // info, free, qna 게시판 모두 List 컴포넌트 사용, 서버에서 불러온 데이터를 출력
        // url 바로 뒤따라오는 게시판 타입은 모두 List 컴포넌트 렌더링, 동적 세그먼트로 렌더링 되도록 추가
        { path: ":type", element: <List /> },
        { path: ":type/new", element: <New /> },
        { path: ":type/:_id", element: <Detail /> },
        { path: ":type/:_id/edit", element: <Edit /> },
        { path: "users/signup", element: <Signup /> },
        { path: "users/login", element: <Login /> },
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