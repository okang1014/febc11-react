import useAxios from "@hooks/useAxios";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

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

  // 상세페이지에서 목록 선택 시 이전 페이지로 이동하도록
  // URI 에 기존의 query string 이 있거나 또는 history back
  const navigate = useNavigate();

  const [data, setData] = useState();

  // useEffect(() => {
  //   setData(dummyData);
  // }, []);

  // AxiosLibrary 사용(ch03-hooks > 09-customhooks 의 hooks 폴더 복사하여 src 에 붙여넣기)
  // const { data } = useAxios({ url: `/todolist/${_id}` }); // id 에 해당하는 상세정보 조회, 출력

  const axios = useAxiosInstance();

  // API 서버로부터 상세정보를 조회해오는 함수 선언
  const fetchDetail = async () => {
    const res = await axios.get(`/todolist/${_id}`);
    setData(res.data);
  };
  // fetchDetail 은 새로운 정보를 조회하여 data 를 새로운 상태값으로 지정

  // 최초 마운트될 때 fetchDetail 한 번만 호출
  useEffect(() => {
    fetchDetail();
  }, []);

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
            {/* button 으로 변경 후, 클릭 시 이전 페이지로 이동 */}
            <button type="button" onClick={() => navigate(-1)}>
              목록
            </button>
          </div>
          {/* 하위 컴포넌트에게 fetchDetail 함수를 context 로 전달 */}
          <Outlet context={{ item: data.item, refetch: fetchDetail }} />
        </>
      )}
    </div>
  );
}

export default TodoDetail;
