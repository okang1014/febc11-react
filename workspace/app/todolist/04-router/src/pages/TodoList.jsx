import TodoListItem from "@pages/TodoListItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 더미 데이터, 이를 가지고 화면 구성
const dummyData = {
  items: [
    {
      _id: 1,
      title: "잠자기",
    },
    {
      _id: 2,
      title: "자바스크립트 복습",
      done: true,
    },
  ],
};

function TodoList() {
  // 초기 상태값(데이터) 지정
  const [data, setData] = useState();

  useEffect(() => {
    setData(dummyData);
  }, []);
  // dependencies 에 빈 배열 전달 => mount 된 이후에 한 번만 호출, 업데이트 될 때 호출 X

  // 삭제 작업
  const handleDelete = (_id) => {
    try {
      // TODO : API 에 서버 삭제 요청
      // 클릭 이벤트이기 때문에 기본 이벤트 제한 필요 없음
      alert("할 일이 삭제되었습니다.");

      // 목록 다시 조회하는 작업 필요
    } catch (err) {
      console.log(err);
      alert("할 일 수정에 실패하였습니다.");
    }
  };

  // 목록형 데이터는 map 함수로 꺼내기
  // data?. 데이터가 있다면, items.map()
  // 최초에는 itemList 는 빈객체, 그 이후, 항목이 추가
  const itemList = data?.items.map((item) => (
    // key 값 지정 - list 요소는 필수
    <TodoListItem key={item._id} item={item} handleDelete={handleDelete} />
  ));

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        {/* /list 를 /add 로 교체, 현재 상황에서는 모두 동일한 방식으로 교체 */}
        {/* 절대 경로는 서비스 규모가 큰 경우, 전체 절대 경로를 추가해야함 */}
        <Link to="/list/add">추가</Link>
        {/* Link to 로 상대 경로를 지정하는 경우, 전체 url 이후에 link 가 추가됨, 그렇기 때문에 되지 않았던 것이었다 */}
        {/* 상대 경로 또는 절대 경로를 사용해야하는 경우가 있지만, 일단 기본적으로 절대 경로로 지정하는 것이 좋다 */}
        <br />
        <form className="search">
          <input type="text" autoFocus />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">{itemList}</ul>
      </div>
    </div>
  );
}

export default TodoList;
