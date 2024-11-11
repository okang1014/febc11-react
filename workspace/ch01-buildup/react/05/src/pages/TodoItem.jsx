function TodoItem({ item, toggleDone, deleteItem }) {
  // 이벤트 콜백 함수에 function() 형태로 지정하게 된다면 결과값을 return 하지 않는 함수이기 때문에 undefined 를 호출하게 됨
  // 따라서 이벤트 콜백 함수에는 함수 자체(() => functionName{})를 전달해야함
  // 이벤트 리스너는 함수를 등록하는 것, 함수 리턴값을 등록하는 것이 아니다!
  return (
    <li>
      <span>{item._id}</span>
      <span onClick={() => toggleDone(item._id)}>
        {item.done ? <s>{item.title}</s> : item.title}{" "}
      </span>
      <button type="button" onClick={() => deleteItem(item._id)}>
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
