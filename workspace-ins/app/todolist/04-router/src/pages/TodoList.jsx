import TodoListItem from "@pages/TodoListItem";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const dummyData = {
  items: [{
    _id: 1,
    title: '잠자기',
  }, {
    _id: 2,
    title: '자바스크립트 복습',
  }]
};

function TodoList() {

  const [data, setData] = useState();

  useEffect(() => {
    setData(dummyData);
  }, []); // 마운트된 후에 한번만 호출

  const itemList = data?.items.map(item => <TodoListItem key={ item._id } item={ item } />);

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        <Link to="/list/add">추가</Link>
        <br/>
        <form className="search">
          <input type="text" autoFocus />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">
          <li>
            <span>1</span>
            <Link to="/list/1">잠자기</Link>
            <Link to="/list">삭제</Link>
          </li>
          <li>
            <span>2</span>
            <Link to="/list/2">자바스크립트 복습</Link>
            <Link to="/list">삭제</Link>
          </li>
          <li>
            <span>3</span>
            <Link to="/list/3"><s>리액트 과제 하기</s></Link>
            <Link to="/list">삭제</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}

export default TodoList;