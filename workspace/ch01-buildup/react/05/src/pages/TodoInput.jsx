import React from "react";

function TodoInput({ addItem }) {
  // 🚨 상태를 관리하기 위한 코드 추가
  // React 에서는 초기 state 는 아무 것도 없도록 함
  // setTitle 은 title 이 변경됨에 따라 리렌더링됨
  // 초기 상태값은 빈 문자열
  const [title, setTitle] = React.useState("");
  // 초기 상태값은 4
  const [nextId, setNextId] = React.useState(4);

  // 항목 추가 관련 기능은 TodoInput 컴포넌트 내에 포함되는 것이 좋음
  const handleAdd = () => {
    // DOM API 를 사용해서 input 란 내부의 값을 받아와야 함
    // 🚨 하지만 React 에서는 DOM API 를 사용하지 않고, 컴포넌트의 상태에 따라 상태가 변경된 부분만 리렌더링을 함
    if (title.trim() !== "") {
      const item = { _id: nextId, title, done: false };
      addItem(item);
      // 추가 버튼이 클릭될 때마다 id 값도 하나씩 증가하도록 설정
      setNextId(nextId + 1);
      setTitle("");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") handleAdd();
  };

  // event 객체를 받아서 이벤트 인자로 전달하는 경우, event 매개변수를 포함한 함수 자체를 전달해야함
  return (
    <div className="todoinput">
      <input
        type="text"
        autoFocus
        onKeyUp={handleKeyUp}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        추가
      </button>
    </div>
  );
}

export default TodoInput;
