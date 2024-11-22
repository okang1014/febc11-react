import Todo from "@pages/Todo";
import TodoReducer from "@pages/TodoReducer";
import { useCallback, useReducer, useRef } from "react";

function TodoContainer() {
  // 샘플 목록
  const sampleItemList = [
    { _id: 1, title: "두부", done: true },
    { _id: 2, title: "계란", done: false },
    { _id: 3, title: "라면", done: true },
  ];

  // for (let i = 4; i <= 10000; i++) {
  //   sampleItemList.push({ _id: i, title: `샘플 - ${[i]}`, done: false });
  // }

  // setItemList 를 호출하면 TodoReducer 를 사용하게 함
  const [itemList, itemListDispatch] = useReducer(TodoReducer, sampleItemList);
  const nextId = useRef(sampleItemList.length + 1);

  // 할 일 추가
  const addItem = (title) => {
    itemListDispatch({
      type: "ADD",
      value: { _id: nextId.current, title, done: false },
    });
    nextId.current += 1;
  };

  // 할 일 완료/미완료 처리
  // TODO: 2. useCallback 으로 함수 메모이제이션
  const toggleDone = useCallback((_id) => {
    itemListDispatch({ type: "TOGGLE", value: { _id } });
  }, []);

  // 할 일 삭제
  // TODO: 2. useCallback 으로 함수 메모이제이션
  const deleteItem = useCallback((_id) => {
    itemListDispatch({ type: "DELETE", value: { _id } });
  }, []);

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