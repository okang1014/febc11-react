// a 태그로 page 를 연결했기 때문에 매번 리프레시되고, 다시 모든 assets 를 불러오게 됨

import Link from "./Link";

// 불필요한 리프레시 - 리프레시가 필요한 부분은 극히 일부분이지만 전체가 리프레시 되는 것은 비효율적
function Header() {
  // Link 컴포넌트에서 이벤트 핸들러 지정
  // const handleClick = (e) => {
  //   // 브라우저 기본 동작 제거(a 태그는 현재 페이지를 비우고, 새로운 페이지를 받아온다)
  //   e.preventDefault();

  //   // (state, title, url) 을 추가
  //   // pathname => href 의 값만
  //   // 직접 history API 에 history 추가
  //   window.history.pushState(null, "", e.target.pathname);
  // };
  return (
    <>
      <header>
        <h1>리액트 라우터 - 01 라우터 구현</h1>
        {/* a 태그 대신 link 컴포넌트 */}
        <Link to="home.html">home</Link>
        <br />
        <Link to="page1.html">page1</Link>
        <br />
        <Link to="page2.html">page2</Link>
      </header>
    </>
  );
}

export default Header;
