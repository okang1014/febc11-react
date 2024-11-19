import TodoItem from "@pages/TodoItem";
import PropTypes from "prop-types";

function TodoList({ itemList, toggleDone, deleteItem }) {
  const list = itemList.map((item) => (
    <TodoItem
      key={item._id}
      item={item}
      toggleDone={toggleDone} // 하위 컴포넌트의 PropType 과 다른 이름으로 props 를 전달하는 경우, 오류 발생, 콘솔에 오류 메시지 출력
      deleteItem={deleteItem}
    />
  ));
  return <ul className="todolist">{list}</ul>;
}

TodoList.propTypes = {
  itemList: PropTypes.array.isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TodoList;
