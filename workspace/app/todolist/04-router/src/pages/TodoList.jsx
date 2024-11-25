import { Link } from "react-router-dom";

function TodoList() {
  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        {/* /list 를 /add 로 교체, 현재 상황에서는 모두 동일한 방식으로 교체 */}
        {/* 절대 경로는 서비스 규모가 큰 경우, 전체 절대 경로를 추가해야함 */}
        <Link to="/add">추가</Link>
        {/* Link to 로 상대 경로를 지정하는 경우, 전체 url 이후에 link 가 추가됨, 그렇기 때문에 되지 않았던 것이었다 */}
        {/* 상대 경로 또는 절대 경로를 사용해야하는 경우가 있지만, 일단 기본적으로 절대 경로로 지정하는 것이 좋다 */}
        <br />
        <form className="search">
          <input type="text" autoFocus />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">
          <li>
            <span>1</span>
            <Link to="/list/1">잠자기</Link>
            {/* 모든 a 태그의 url 이 동일한 경우, 어떤 항목의 상세인지 확인하기 어려움, 따라서 각 항목에 대한 id 가 필요 */}
            <Link to="/list">삭제</Link>
          </li>
          <li>
            <span>2</span>
            <Link to="/list/2">자바스크립트 복습</Link>
            <Link to="/list">삭제</Link>
          </li>
          <li>
            <span>3</span>
            <Link to="/list/3">
              <s>리액트 과제 하기</s>
            </Link>
            <Link to="/list">삭제</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
