import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

function TodoDetail() {
  const { _id } = useParams();
  console.log(_id);

  const navigate = useNavigate();

  // useState 를 가지고 상세 조회, react query 로 대체
  // const [data, setData] = useState();
  // API 서버로부터 상세정보를 조회해오는 함수 선언
  // const fetchDetail = async () => {
  //   const res = await axios.get(`/todolist/${_id}`);
  //   setData(res.data);
  // };
  // useEffect(() => {
  //   fetchDetail();
  // }, []);

  const axios = useAxiosInstance();

  const { data, refetch, isLoading } = useQuery({
    queryKey: [`todolist`, _id], // id 값의 할 일 상세인지, queryKey 에 지정한 _id 를 내부적으로 사용
    queryFn: () => axios.get(`/todolist/${_id}`), // queryKey 의 _id 값을 받아서 매개변수를 사용
    select: (res) => res.data, // data 변수에 저장
    staleTime: 1000 * 60, // 1분 동안 캐시 상태 유지
  });

  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
      {isLoading && <div>Loading in progress</div>}
      {data && (
        <>
          <div className="todo">
            <div>제목 : {data.item.title}</div>
            <div>내용 : {data.item.content}</div>
            <div>상태 : {data.item.done ? "완료" : "미완료"}</div>
            <div>작성일 : {data.item.createdAt}</div>
            <div>수정일 : {data.item.updatedAt}</div>
            <Link to="./edit">수정</Link>
            <button type="button" onClick={() => navigate(-1)}>
              목록
            </button>
          </div>
          {/* 하위 컴포넌트에게 fetchDetail 함수를 context 로 전달 */}
          <Outlet context={{ item: data.item /*refetch*/ }} />
          {/* refetch 를 props 로 전달하여 수정 페이지에서 사용하는 방식보다는, queryClient.invalidateQueries 로 처리하는 것이 효과적 */}
        </>
      )}
    </div>
  );
}

export default TodoDetail;
