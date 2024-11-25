// lazy-loading 적용한 라우터 파일
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// lazy-loading 할 컴포넌트 지정, 하나의 파일로 번들링해서 저장하는 것이 아닌,
// lazy-loading 지정된 컴포넌트는 분리된 파일로 저장됨
// 그때 그때 필요한 파일만 서버로부터 전달받아 실행
const Layout = lazy(() => import("@components/Layout"));
const About = lazy(() => import("@pages/About"));
const ErrorPage = lazy(() => import("@pages/ErrorPage"));
const Home = lazy(() => import("@pages/Home"));
const TodoAdd = lazy(() => import("@pages/TodoAdd"));
const TodoDetail = lazy(() => import("@pages/TodoDetail"));
const TodoEdit = lazy(() => import("@pages/TodoEdit"));
const TodoList = lazy(() => import("@pages/TodoList"));

// 동적 Import
// import Layout from "@components/Layout";
// import About from "@pages/About";
// import ErrorPage from "@pages/ErrorPage";
// import Home from "@pages/Home";
// import TodoAdd from "@pages/TodoAdd";
// import TodoDetail from "@pages/TodoDetail";
// import TodoEdit from "@pages/TodoEdit";
// import TodoList from "@pages/TodoList";

const router = createBrowserRouter(
  [
    {
      // localhost/
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />, // 404 error 발생 시, 에러에 해당하는 컴포넌트로 이동
      children: [
        { index: true, element: <Navigate to="/home" /> }, // / 까지만 입력되고 이후 주소값이 없는 경우, home 으로 이동
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "list", element: <TodoList /> },
        // REST API - 경로는 주소만, 그리고 URL 은 브라우저가 봤을 때 동일한 컨텐츠가 나오도록 만들어주어야 함
        // 라우터 설계하였을 때 계속 depth 가 깊어지는 상황이 생긴다(내가 그랬다)
        // 이는 각 페이지에서 경로를 절대경로로 지정함으로써 해결할 수 있음
        // React Router 의 Link to 와 a href 의 차이
        { path: "list/add", element: <TodoAdd /> },
        // 상세 페이지의 url 에서 각 게시물의 id 지정, path 에 :_id 를 지어줌으로써 동적으로 url 이 지정되도록 함(세그먼트)
        // TodoDetail 에서 useParams() 리액트 라우터 hook 을 사용하여 id 값을 동적으로 지정할 수 있음
        // : 이후에는 변수 이름이 됨
        {
          path: "list/:_id", // localhost/list/:_id
          element: <TodoDetail />,
          children: [
            // localhost/list/:_id/edit
            { path: "edit", element: <TodoEdit /> },
            // edit 는 detail 의 자식 컴포넌트로.
            // TodoEdit 이 보이려면 list/edit 이런 식으로 접근
          ],
        },
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
