import { Link, NavLink } from "react-router-dom";
// Link 는 react-router-dom 에서 제공하는 컴포넌트명

function Header() {
  return (
    <>
      <header>
        <h1>리액트 라우터 - 02 리액트 라우터 사용</h1>

        {/* router 의 NavLink 컴포넌트 */}
        <NavLink
          // isActive 는 true 또는 false 전달, 현재 URI 와 a 태그의 to 가 동일하면 진하게 표시
          className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
          to="/page1"
        >
          Page1
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
          to="/page2"
        >
          Page2
        </NavLink>

        {/* a 태그 대신 link 컴포넌트 + to 속성 추가 */}
        {/* <Link to="/">home</Link>
        <br />
        <Link to="/page1">page1</Link>
        <br />
        <Link to="/page2">page2</Link> */}
      </header>
    </>
  );
}

export default Header;
