import PropTypes from "prop-types";

function TodoItem({ item, toggleDone, deleteItem }) {
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

// propTypes 를 통해 TodoItem 이 전달받는 props 의 type 정의
// isRequired 는 필수 props 이며 없는 경우, 오류 발생
TodoItem.propTypes = {
  // item: PropTypes.object, // item props 자체를 object 타입으로 지정
  // PropTypes.shape 로 하위 props 의 타입을 더 세분화해서 지정 가능
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool,
  }).isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TodoItem;
