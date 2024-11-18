import Footer from "@components/Footer";
import Header from "@components/Header";
import Todo from "@pages/Todo";
import { useState } from "react";

function App() {
  // 샘플 목록
  const [itemList, setItemList] = useState([
    { _id: 1, title: "두부", done: true },
    { _id: 2, title: "계란", done: false },
    { _id: 3, title: "라면", done: true },
  ]);

  // 할 일 추가
  const addItem = (item) => {
    const newItemList = [...itemList, item]; // 객체(또는 배열)일 경우 새로운 객체(주소가 변경된)로 만들어야 화면이 갱신된다
    setItemList(newItemList); // setter 함수를 이용해야 화면 갱신이 됨
  };

  // 할 일 완료/미완료 처리
  const toggleDone = (_id) => {
    // 데이터 갱신(상태 변경)
    const newItemList = [...itemList]; // 불변성을 지키기 위해 원래 배열을 한 번 복사
    const item = itemList.find((item) => item._id === _id);
    item.done = !item.done;
    setItemList(); // 상태 변경을 위한 새로운 배열 전달
    // spread 연산자를 사용해서 기존 배열의 값을 복사한 새로운 배열을 생성, 상태값 변경
  };

  // 할 일 삭제
  const deleteItem = (_id) => {
    // 데이터 갱신(상태 변경)
    // filter 메서드는 조건에 맞는 결과만 포함하는 새로운 배열이 생성됨
    const newItemList = itemList.filter((item) => item._id !== _id);
    setItemList(newItemList);
  };

  return (
    <div id="todo">
      <Header />
      <Todo
        // 컴포넌트끼리의 데이터 전달은 부모 컴포넌트에서 자식 컴포넌트로 전달
        // props 로 전달 가능
        itemList={itemList}
        addItem={addItem}
        toggleDone={toggleDone}
        deleteItem={deleteItem}
      />
      <Footer />
    </div>
  );
}

export default App;
