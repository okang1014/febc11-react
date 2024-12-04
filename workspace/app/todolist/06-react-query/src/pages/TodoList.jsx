import TodoListItem from "@pages/TodoListItem";
import useFetch from "@hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import "../Pagination.css";
import Pagination from "@components/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";

function TodoList() {
  const searchRef = useRef("");

  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    keyword: searchParams.get("keyword") || "",
    page: searchParams.get("page") || 1,
    limit: 5, // 한 페이지 당 다섯개
  };

  // useEffect(() => {
  //   setData(dummyData);
  // }, []);

  // const { data } = useFetch({ url: "/todolist" }); // useFetch 커스텀 훅을 사용, url 을 추가한 이후, data 만 추출

  // axios 인스턴스
  const axios = useAxiosInstance();

  //   const [data, setData] = useState();

  // const fetchList = async () => {
  //   const res = await axios.get(`/todolist/`, { params });
  //   setData(res.data);
  // };
  // useEffect(() => {
  //   fetchList();
  // }, [searchParams]);

  const { data, refetch } = useQuery({
    queryKey: ["todolist", params], // queryKey 의 값이 변경되면 리렌더링(useEffect 의 dependencies 와 비슷한 역할)
    queryFn: () => axios.get("/todolist", { params }),
    select: (res) => res.data,
    staleTime: 1000 * 60,
    // fresh => stale 전환되는데 걸리는 시간
    // 일단은 이전에 캐시된 데이터를 표시함과 동시에 서버에 요청 전송, 그리고 서버 응답을 받아서 리렌더링
    // stale 상태로 전환되지만 곧바로 재요청 이후 렌더링하는 것이 아니라 캐시된 상태를 출력한 이후, 서버 요청 전송
    gcTime: 1000 * 60 * 5, // 기존 캐시된 키를 제거한 이후 다시 재요청 default 5분
    // refetchOnMount: "always", // true(default) 인 경우, mount 시 마운트 되는 경우에만
    // refetchOnWindowFocus: true, // true(default) 인 경우, 윈도우가 포커스 시 다시 서버 요청, false 는 캐시된 결과물 출력
  });

  // 삭제 작업
  // const handleDelete = async (_id) => {
  //   try {
  //     await axios.delete(`/todolist/${_id}`);
  //     refetch();
  //     alert("할 일이 삭제되었습니다.");
  //   } catch (err) {
  //     console.log(err);
  //     alert("할 일 삭제에 실패하였습니다.");
  //   }
  // };

  const deleteItem = useMutation({
    mutationFn: (_id) => {
      axios.delete(`/todolist/${_id}`);
    },
    onSuccess: () => {
      alert("할 일이 삭제되었습니다.");
      refetch(); // 삭제 성공 시 자동으로 refetch()
    },
    onError: (err) => {
      alert("할 일 삭제에 실패했습니다.");
    },
  });

  const itemList = data?.items.map((item) => (
    // <TodoListItem key={item._id} item={item} handleDelete={handleDelete} />
    <TodoListItem
      key={item._id}
      item={item}
      handleDelete={() => deleteItem.mutate(item._id)}
    /> // mutationFn 에 지정한 함수 호출
  ));

  // 검색 기능
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(new URLSearchParams(`keyword=${searchRef.current.value}`));
  };

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        <Link to="/list/add">추가</Link>
        <br />
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            autoFocus
            placeholder="검색어를 입력해주세요."
            defaultValue={params.keyword}
            ref={searchRef}
          />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">{itemList}</ul>
      </div>
      {data && (
        <Pagination
          totalPages={data.pagination.totalPages}
          current={data.pagination.page}
        />
      )}
    </div>
  );
}

export default TodoList;
