import { Link } from "react-router-dom";

function TodoAdd() {
  return (
    <div id="main">
      <h2>할일 추가</h2>
      <div className="todo">
        <form>
          <label htmlFor="title">제목 :</label>
          <input type="text" id="title" autoFocus />
          <br />
          <label htmlFor="content">내용 :</label>
          <textarea id="content" cols="23" rows="5"></textarea>
          <br />
          <Link to="/list/1">추가</Link>
          {/* 리액트 라우터 사용 시, 상대 경로에 / 를 추가하지 않게 되면 현재 링크에 to 이하 속성을 전달, 절대 경로 형태로 바꿔줌, 가능한 절대 경로로 표시 */}
          <Link to="/list">취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoAdd;
