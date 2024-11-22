import Page1 from "./Page1";
import Home from "./Home";
import Page2 from "./Page2";
import { useEffect, useState } from "react";

function App() {
  // 현재 domain 정보 뒷 부분을 기초 상태값으로 지정
  const [path, setPath] = useState(window.location.pathname);
  console.log(path);

  // 최초 한 번만 호출
  useEffect(() => {
    const handleNavigate = (e) => {
      setPath(e.destination.url.split(location.host).pop());
    };
    window.navigation.addEventListener("navigate", handleNavigate);
    return () => {
      window.navigation.removeEventListener("navigate", handleNavigate);
    }; //cleanUp 함수
  }, []);

  return (
    <>
      {/* 주소에 따라 세 개의 페이지가 다르게 표시되어야 함 */}
      {/* state 에 따라 컴포넌트 렌더링 */}
      {(path === "/" || path === "/home.html") && <Home />}
      {path === "/page1.html" && <Page1 />}
      {path === "/page2.html" && <Page2 />}
    </>
  );
}

export default App;
