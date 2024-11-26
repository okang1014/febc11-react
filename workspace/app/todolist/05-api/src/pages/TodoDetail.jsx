import useAxios from "@hooks/useAxios";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

// const dummyData = {
//   item: {
//     _id: 5,
//     title: "Javascript 공부",
//     content: "열심히 하자",
//     done: false,
//     createdAt: "2024.11.21 16:49:00",
//     updatedAt: "2024.11.21 16:49:00",
//   },
// };

function TodoDetail() {
  const { _id } = useParams();
  console.log(_id);

  // const [data, setData] = useState();

  // useEffect(() => {
  //   setData(dummyData);
  // }, []);

  // AxiosLibrary 사용(ch03-hooks > 09-customhooks 의 hooks 폴더 복사하여 src 에 붙여넣기)
  const { data } = useAxios({ url: `/todolist/${_id}` }); // id 에 해당하는 상세정보 조회, 출력

  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
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
            <Link to="/list">목록</Link>
          </div>
          <Outlet context={{ item: data.item }} />
        </>
      )}
    </div>
  );
}

export default TodoDetail;
