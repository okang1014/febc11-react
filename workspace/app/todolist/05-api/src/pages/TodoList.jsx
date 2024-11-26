import TodoListItem from "@pages/TodoListItem";
import useFetch from "@hooks/useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";

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
  // const [data, setData] = useState();

  // useEffect(() => {
  //   setData(dummyData);
  // }, []);

  const { data } = useFetch({ url: "/todolist" }); // useFetch 커스텀 훅을 사용, url 을 추가한 이후, data 만 추출

  // axios 인스턴스
  const axios = useAxiosInstance();

  // 삭제 작업
  const handleDelete = async (_id) => {
    try {
      // TODO: 삭제
      await axios.delete(`/todolist/${_id}`);

      alert("할 일이 삭제되었습니다.");
    } catch (err) {
      console.log(err);
      alert("할 일 삭제에 실패하였습니다.");
    }
  };

  const itemList = data?.items.map((item) => (
    <TodoListItem key={item._id} item={item} handleDelete={handleDelete} />
  ));

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        <Link to="/list/add">추가</Link>
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
