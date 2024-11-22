import { Outlet } from "react-router-dom";
import Header from "./Header";

// 모든 페이지에서 공통으로 사용하는 레이아웃을 정의하기 위한 컴포넌트
// 진정한 의미의 레이아웃 컴포넌트
function Layout() {
  return (
    <>
      <Header />
      {/* Outlet 위치에 각 컴포넌트가 삽입됨, routes 에서 children 에 정의된 컴포넌트가 삽입됨 */}
      <Outlet />
    </>
  );
}

export default Layout;
