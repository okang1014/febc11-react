import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import useThemeStore from "@zustand/themeStore";

function App() {
  const { isDarkMode } = useThemeStore();

  // isDarkMode 값에 따라 documentElement(html 태그) 에 dark 클래스 추가
  if (isDarkMode) {
    // 다크모드인 경우
    document.documentElement.classList.add("dark");
  } else {
    // 다크모드가 아닌 경우
    document.documentElement.classList.remove("dark");
  }
  // routes.jsx 파일에서 설정한 경로대로 화면을 표시해주는 역할
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
