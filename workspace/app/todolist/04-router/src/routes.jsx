import Layout from "@components/Layout";
import About from "@pages/About";
import ErrorPage from "@pages/ErrorPage";
import Home from "@pages/Home";
import TodoAdd from "@pages/TodoAdd";
import TodoDetail from "@pages/TodoDetail";
import TodoEdit from "@pages/TodoEdit";
import TodoList from "@pages/TodoList";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/home" /> }, // / 까지만 입력되고 이후 주소값이 없는 경우, home 으로 이동
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "list", element: <TodoList /> },
        // REST API - 경로는 주소만, 그리고 URL 은 브라우저가 봤을 때 동일한 컨텐츠가 나오도록 만들어주어야 함
        // 라우터 설계하였을 때 계속 depth 가 깊어지는 상황이 생긴다(내가 그랬다)
        // 이는 각 페이지에서 경로를 절대경로로 지정함으로써 해결할 수 있음
        // React Router 의 Link to 와 a href 의 차이
        { path: "add", element: <TodoAdd /> },
        { path: "edit", element: <TodoEdit /> },
        // 상세 페이지의 url 에서 각 게시물의 id 지정, path 에 :_id 를 지어줌으로써 동적으로 url 이 지정되도록 함(세그먼트)
        { path: "list/:_id", element: <TodoDetail /> }, // TodoDetail 에서 useParams() 리액트 라우터 hook 을 사용하여 id 값을 동적으로 지정할 수 있음
        // : 이후에는 변수 이름이 됨
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
