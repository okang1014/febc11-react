import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// 상위 컴포넌트로부터 전달받은 props type 지정
TodoListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool, // done 의 proptype 은 필수가 아니도록 지정(있으면 true, undefined 면 그냥 false)
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

// list 항목 하나하나에 대한 컴포넌트
function TodoListItem({ item, handleDelete }) {
  // TodoList (부모 컴포넌트)로부터 item 객체를 props 로 전달 받음
  return (
    <li>
      <span>{item._id}</span>
      <Link to={`/list/${item._id}`}>
        {item.done ? <s>{item.title}</s> : item.title}
      </Link>
      {/* 모든 a 태그의 url 이 동일한 경우, 어떤 항목의 상세인지 확인하기 어려움, 따라서 각 항목에 대한 id 가 필요 */}
      <button
        type="button"
        onClick={() => {
          handleDelete(item._id);
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default TodoListItem;
