import { Link, useNavigate, useOutletContext } from "react-router-dom";

function TodoEdit() {
  // Outlet 으로부터 전달받은 context 를 useOutletContext(react-router 훅)으로 추출하여 prop 으로 사용
  // const props = useOutletContext();
  const { item } = useOutletContext();

  // 프로그래밍 방식으로 페이지 이동 - 리액트 라우터 제공 훅
  // 원하는 시점에 특정 페이지로 이동, navigate 함수 반환
  const navigate = useNavigate();

  // 수정 작업
  const onSubmit = (e) => {
    // 수정, 삭제는 성공 여부를 사용자의 눈으로 확인할 수 없기 때문에 별도의 표시가 필요
    try {
      // submit 은 기본적으로 리프레시, 따라서 SPA 에는 적절치 않아. 브라우저 기본 동작 취소
      e.preventDefault();

      // TODO : API 서버에 수정 요청

      alert("할 일이 수정되었습니다.");

      // 할 일 상세보기로 이동
      // navigate(`..`, { relative: true }); // 현재 경로 기준 한 단계 위 경로로 이동, 상대 경로로 지정
      // navigate(`/list/${item._id}`); // 절대 경로로 이동
      // navigate(`/list/${item._id}`, { replace: true }); // 절대 경로로 이동, 뒤로가기 시 다시 수정화면으로 가는 것이 아니라, 그 전 화면으로 이동, 마지막 히스토리를 상세페이지로 대체하게 됨, 따라서 뒤로가기 누르는 경우 다시 상세 페이지로 사용, window.history.replaceState()
      navigate(-1); // navigate 에 숫자를 전달하면 히스토리 back 의 효과, window.history.back(-1)
      // 주의: 위 방법들은 수정한 이후의 정보가 표시되지는 않음
    } catch (err) {
      console.log(err);
      alert("할 일 수정에 실패하였습니다.");
    }
  };

  return (
    <>
      <h2>할일 수정</h2>
      <div className="todo">
        {/* submit 이벤트 발생 시, onSubmit 함수 실행 */}
        <form onSubmit={onSubmit}>
          <label htmlFor="title">제목 :</label>
          {/* defaultValue 로 선언하여 비제어 컴포넌트로 지정 */}
          {/* 제어 컴포넌트 지정 시, React 로 제어, 비제어 컴포넌트 지정 시, 브라우저 자동으로 진행 */}
          <input type="text" id="title" defaultValue={item.title} autoFocus />
          <br />
          <label htmlFor="content">내용 :</label>
          <textarea
            id="content"
            cols="23"
            rows="5"
            defaultValue={item.content}
          />
          <br />
          <label htmlFor="done">완료 :</label>
          <input type="checkbox" id="done" defaultChecked />
          <br />
          <button type="submit">수정</button>
          <Link to="/list/1">취소</Link>
        </form>
      </div>
    </>
  );
}

export default TodoEdit;
