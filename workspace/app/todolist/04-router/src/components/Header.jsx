import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Todo List</h1>
      <nav>
        <div>
          <ul>
            <li>
              <NavLink to="./home">Home</NavLink>
            </li>
            <li>
              <NavLink to="./about">About</NavLink>
            </li>
            <li>
              <NavLink to="./list">TodoList</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
