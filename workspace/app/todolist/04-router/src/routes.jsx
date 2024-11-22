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
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "list", element: <TodoList /> },
        { path: "list/list", element: <Navigate to="/list" /> },
        { path: "list/todoadd", element: <TodoAdd /> },
        { path: "list/tododetail", element: <TodoDetail /> },
        { path: "list/todoedit", element: <TodoEdit /> },
        { path: "list/todoerror", element: <ErrorPage /> },
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
