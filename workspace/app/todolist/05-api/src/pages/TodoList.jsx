import TodoListItem from "@pages/TodoListItem";
import useFetch from "@hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import "../Pagination.css";
import Pagination from "@components/Pagination";

// const dummyData = {
//   items: [
//     {
//       _id: 1,
//       title: "잠자기",
//     },
//     {
//       _id: 2,
//       title: "자바스크립트 복습",
//       done: true,
//     },
//   ],
// };

// fetchAPI 사용(ch03-hooks > 09-customhooks 의 hooks 폴더 복사하여 src 에 붙여넣기)
function TodoList() {
  const [data, setData] = useState();
  const searchRef = useRef("");

  // react-router-dom 에서 제공하는 훅
  // 주소창의 query string 을 읽어오거나 설정할 때 사용, URL 에서 ? 뒤의 정보
  // /list?keyword=환승&page=3 => 물음표 뒤의 내용을 new URLSearchParams() 객체 반환
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    // url 에서 받은 검색 키워드를 획득하라
    keyword: searchParams.get("keyword") || "", // keyword 가 없으면 기본 화면으로 전달
    // url 에서 받은 페이지를 획득하라
    page: searchParams.get("page") || 1, // page 가 있다면 1페이지를 줌, 그렇지 않다면 1페이지 전달
    limit: 5, // 한 페이지 당 다섯개
  };

  // useEffect(() => {
  //   setData(dummyData);
  // }, []);

  // const { data } = useFetch({ url: "/todolist" }); // useFetch 커스텀 훅을 사용, url 을 추가한 이후, data 만 추출

  // axios 인스턴스
  const axios = useAxiosInstance();

  // TODO 2: API 서버 요청 결과로 최초 상태 지정 함수 선언
  const fetchList = async () => {
    // 기존 get 요청에서 두번째 인자로 전달할 파라미터를 전달
    // axios 라이브러리 자체에서 제공하는 기능
    const res = await axios.get(`/todolist/`, { params });
    setData(res.data);
  };

  // TODO 1: 최초 마운트 시 화면 렌더링
  useEffect(() => {
    fetchList();
  }, [searchParams]);
  // searchParams 상태가 변경되었을 때 업데이트 되도록 dependencies 에 searchParams 지정

  // 삭제 작업
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/todolist/${_id}`);
      // TODO 3: 삭제 시 화면 리렌더링 기능 추가
      fetchList();
      alert("할 일이 삭제되었습니다.");
    } catch (err) {
      console.log(err);
      alert("할 일 삭제에 실패하였습니다.");
    }
  };

  const itemList = data?.items.map((item) => (
    <TodoListItem key={item._id} item={item} handleDelete={handleDelete} />
  ));

  // 검색 기능 추가
  // useState 는 입력될 때마다 리렌더링됨
  // useRef 는 전체 입력된 이후 submit 시 리렌더링
  const handleSearch = (e) => {
    // 브라우저 기본 동작 취소(submit 시 화면 리프레시)
    e.preventDefault();
    setSearchParams(new URLSearchParams(`keyword=${searchRef.current.value}`));
    // searchRef 로 input 란의 current.value 를 획득할 수 있음
    // const inputKeyword = searchRef.current.value;
    // console.log(inputKeyword);
    // const newSearchParams = new URLSearchParams(`keyword=${inputKeyword}`);
    // 검색창에 입력한 값을 URL 의 params 를 전달하여 화면이 리렌더링되도록 설정
    // 이 작업은 주소창에 검색한 키워드를 함께 표시해주기 위한 목적
  };

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        <Link to="/list/add">추가</Link>
        <br />
        {/* form 요소에 submit 이벤트 추가 */}
        <form className="search" onSubmit={handleSearch}>
          {/* 제어 컴포넌트 - state 로 관리, 상태 변경될 때마다 리렌더링
          비제어 컴포넌트 - ref 로 관리, 원할 때만 리렌더링 */}
          <input
            type="text"
            autoFocus
            placeholder="검색어를 입력해주세요."
            defaultValue={params.keyword}
            // 초기값은 params.keyword 로 지정, 최초에는 아무 값도 있지 않은 상태
            ref={searchRef}
          />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">{itemList}</ul>
      </div>
      {/* pagination 컴포넌트에 데이터가 있다면 pagination 의 totalPages 와 page 를 props 로 전달 */}
      {/* 데이터가 있는 경우에만 pagination 컴포넌트 호출 */}
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
