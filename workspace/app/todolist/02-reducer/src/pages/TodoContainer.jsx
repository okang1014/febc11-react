import Todo from "@pages/Todo";
import TodoReducer from "@pages/TodoReducer";
import { useReducer, useRef, useState } from "react";

// 컨테이너 컴포넌트로 상태관리 및 비즈니스 로직을 전부 현 파일에서 관리
// 하위 표현 컴포넌트를 표현하는 코드 외에 UI 를 구성하는 코드는 없음

function TodoContainer() {
  // 샘플 목록
  const sampleItemList = [
    { _id: 1, title: "두부", done: true },
    { _id: 2, title: "계란", done: false },
    { _id: 3, title: "라면", done: true },
  ];

  // setItemList 를 호출하면 TodoReducer 를 사용하게 함
  const [itemList, itemListDispatch] = useReducer(TodoReducer, sampleItemList);
  // id 가 변경되는 경우 setter 가 실행, 페이지가 리렌더링됨
  // const [nextId, setNextId] = useState(sampleItemList.length + 1);
  // useState 대신 useRef 로 데이터 유지
  const nextId = useRef(sampleItemList.length + 1);

  // 할 일 추가
  const addItem = (title) => {
    itemListDispatch({
      type: "ADD",
      value: { _id: nextId.current, title, done: false },
    });
    // const newItemList = [...itemList, item]; // 객체(또는 배열)일 경우 새로운 객체(주소가 변경된)로 만들어야 화면이 갱신된다
    // setItemList(newItemList); // setter 함수를 이용해야 화면 갱신이 됨
    nextId.current += 1;
  };

  // 할 일 완료/미완료 처리
  const toggleDone = (_id) => {
    itemListDispatch({ type: "TOGGLE", value: { _id } });
    // const newItemList = produce(itemList, (draft) => {
    //   const item = draft.find((item) => item._id === _id);
    //   // itemList 를 draft 라는 proxy 객체로 복제, draft 에 실행할 함수 추가
    //   item.done = !item.done;
    // });

    // setItemList(newItemList);

    // console.log("예전 itemList", itemList);
    // console.log("새로운 itemList", newItemList);
  };

  // 할 일 삭제
  const deleteItem = (_id) => {
    itemListDispatch({ type: "DELETE", value: { _id } });
    // 데이터 갱신(상태 변경)
    // filter 메서드는 조건에 맞는 결과만 포함하는 새로운 배열이 생성됨
    // const newItemList = itemList.filter((item) => item._id !== _id);
    // setItemList(newItemList);
  };

  return (
    <Todo
      itemList={itemList}
      addItem={addItem}
      toggleDone={toggleDone}
      deleteItem={deleteItem}
    />
  );
}

export default TodoContainer;
