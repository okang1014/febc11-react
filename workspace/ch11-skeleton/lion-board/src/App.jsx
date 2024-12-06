import { RouterProvider } from "react-router-dom";
import router from "@/routes";

function App() {
  // routes.jsx 파일에서 설정한 경로대로 화면을 표시해주는 역할
  return <RouterProvider router={router} />;
}

export default App;
