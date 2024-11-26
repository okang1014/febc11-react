import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

const dummyData = {
  item: {
    _id: 5,
    title: "Javascript 공부",
    content: "열심히 하자",
    done: false,
    createdAt: "2024.11.21 16:49:00",
    updatedAt: "2024.11.21 16:49:00",
  },
};

function TodoDetail() {
  // useParams 리액트 라우터 훅 사용
  // id 값을 uri 로부터 추출, 동적으로 uri 세그먼트를 가져올 때 주로 사용
  // URL 의 파라미터 추출
  // 라우터에 'list/:_id' 로 등록된 컴포넌트가 호출되는 경우
  // URL 이 list/3 일 때 useParams() 는 {_id: 3} 을 반환
  const { _id } = useParams();
  console.log(_id);

  const [data, setData] = useState();

  useEffect(() => {
    // TODO : API 서버 통신 - side effect 가 발생하는 코드는 useEffect 내부에 실행
    setData(dummyData);
  }, []);

  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
      {/* data 가 있는 경우에만 아래 코드를 실행, 렌더링 */}
      {/* 서버가 어떤 데이터를 전달해주더라도 최초에 한 번 렌더링 - 함수의 순수성을 유지
      setEffect 안에 있는 API 서버 응답으로 setData 가 되기 때문에 리렌더링 됨 */}
      {data && ( // 조건부 렌더링
        <>
          <div className="todo">
            <div>제목 : {data.item.title}</div>
            <div>내용 : {data.item.content}</div>
            <div>상태 : {data.item.done ? "완료" : "미완료"}</div>
            <div>작성일 : {data.item.createdAt}</div>
            <div>수정일 : {data.item.updatedAt}</div>
            {/* 가능한 절대 주소로 지정하는 것이 좋음 */}
            <Link to="./edit">수정</Link>
            {/* 한 페이지의 자식 페이지로 지정하는 경우, 기존 url 에서 to 의 속성이 추가되어야 해당 페이지에 접근 가능, 따라서 상대경로 사용 */}
            <Link to="/list">목록</Link>
          </div>
          {/* context 는 outlet 에 정의된 Props 를 하위 요소로 전달하기 위한 속성, context 는 자식 요소로 전달되는 고정적인 속성 명 */}
          <Outlet context={{ item: data.item }} />
          {/* 하위 자식 요소를 표시하기 위해서는 해당 컴포넌트가 들어가기 위해 outlet 에 삽입되도록 해야함 */}
          {/* Outlet 을 조건부 렌더링하는 경우, 하위 컴포넌트에 undefined 데이터가 전달, 그래서 오류 발생, 따라서 Outlet 도 조건부 렌더링 안에 포함시켜 데이터가 있는 경우에만 렌더링되도록 함 */}
        </>
      )}
    </div>
  );
}

export default TodoDetail;
