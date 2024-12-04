import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Todo List</h1>
      <nav>
        <div>
          <ul>
            {/* NavLink 로 현재 위치 탭을 표시하기 위해 사용 */}
            <li>
              <NavLink
                to="home"
                className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="about"
                className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="list"
                className={({ isActive }) => (isActive ? "menu-dark" : "menu")}
              >
                TodoList
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
