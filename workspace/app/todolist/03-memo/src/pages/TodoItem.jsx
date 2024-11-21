import PropTypes from "prop-types";
import { memo } from "react";

// TODO: 1. React.memo 로 컴포넌트를 메모이제이션
// 현재는 리렌더링되는 경우 매번 함수가 재실행
// 하나의 리스트 항목에 수정, 삭제되는 경우에도 전체 컴포넌트가 렌더링됨
// 컴포넌트를 메모이제이션하면 전달받은 콜백함수 props도 메모이제이션이 되도록 해야함
const TodoItem = memo(function TodoItem({ item, toggleDone, deleteItem }) {
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
});

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
