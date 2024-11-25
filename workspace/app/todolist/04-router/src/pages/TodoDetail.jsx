import { Link, Outlet, useParams } from "react-router-dom";

function TodoDetail() {
  // useParams 리액트 라우터 훅 사용
  // id
  const { _id } = useParams();
  console.log(_id);
  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
      <div className="todo">
        <div>제목 : 잠자기</div>
        <div>내용 : 주말에 수업 끝나면 잠이나 실컷 자야지</div>
        <div>상태 : 미완료</div>
        <div>작성일 : 2024.11.25 12:23:45</div>
        <div>수정일 : 2024.11.25 13:45:12</div>
        {/* 가능한 절대 주소로 지정하는 것이 좋음 */}
        <Link to="./edit">수정</Link>
        {/* 한 페이지의 자식 페이지로 지정하는 경우, 기존 url 에서 to 의 속성이 추가되어야 해당 페이지에 접근 가능, 따라서 상대경로 사용 */}
        <Link to="/list">목록</Link>
      </div>
      <Outlet />
      {/* 하위 자식 요소를 표시하기 위해서는 해당 컴포넌트가 들어가기 위해 outlet 에 삽입되도록 해야함 */}
    </div>
  );
}

export default TodoDetail;
