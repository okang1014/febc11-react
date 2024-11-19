import Todo from "@pages/Todo";
import { produce } from "immer";
import { useState } from "react";

// 컨테이너 컴포넌트로 상태관리 및 비즈니스 로직을 전부 현 파일에서 관리
// 하위 표현 컴포넌트를 표현하는 코드 외에 UI 를 구성하는 코드는 없음

function TodoContainer() {
  // 샘플 목록
  const sampleItemList = [
    { _id: 1, title: "두부", done: true },
    { _id: 2, title: "계란", done: false },
    { _id: 3, title: "라면", done: true },
  ];
  const [itemList, setItemList] = useState(sampleItemList);

  // 할 일 추가
  const addItem = (item) => {
    const newItemList = [...itemList, item]; // 객체(또는 배열)일 경우 새로운 객체(주소가 변경된)로 만들어야 화면이 갱신된다
    setItemList(newItemList); // setter 함수를 이용해야 화면 갱신이 됨
  };

  // 할 일 완료/미완료 처리
  const toggleDone = (_id) => {
    // 데이터 갱신(상태 변경)
    // const newItemList = [...itemList]; // 불변성을 지키기 위해 원래 배열을 한 번 복사
    // const item = itemList.find((item) => item._id === _id);
    // item.done = !item.done;
    // setItemList(newItemList); // 상태 변경을 위한 새로운 배열 전달
    // spread 연산자를 사용해서 기존 배열의 값을 복사한 새로운 배열을 생성, 상태값 변경
    // 상태 변경에 따른 리렌더링은 가능하지만 상태의 불변성이 확보되지 않은 상황 -> immer 라이브러리를 쓰자
    const newItemList = produce(itemList, (draft) => {
      const item = draft.find((item) => item._id === _id);
      // itemList 를 draft 라는 proxy 객체로 복제, draft 에 실행할 함수 추가
      item.done = !item.done;
    });

    setItemList(newItemList);

    console.log("예전 itemList", itemList);
    console.log("새로운 itemList", newItemList);
  };

  // 할 일 삭제
  const deleteItem = (_id) => {
    // 데이터 갱신(상태 변경)
    // filter 메서드는 조건에 맞는 결과만 포함하는 새로운 배열이 생성됨
    const newItemList = itemList.filter((item) => item._id !== _id);
    setItemList(newItemList);
  };

  return (
    <Todo
      // 컴포넌트끼리의 데이터 전달은 부모 컴포넌트에서 자식 컴포넌트로 전달
      // props 로 전달 가능
      itemList={itemList}
      addItem={addItem}
      toggleDone={toggleDone}
      deleteItem={deleteItem}
    />
  );
}

export default TodoContainer;
