import PropTypes from "prop-types";
import "./Button.css";

Button.propTypes = {
  // type 을 node 로 지정하면 children 은 모든 종류의 하위 요소로 넘어올 수 있음
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func, // 버튼 요소는 클릭 이벤트가 필수일 필요는 없음. 왜냐면 버튼이 이벤트 핸들러가 없는 경우도 있다
  color: PropTypes.string,
};

// Button 컴포넌트는 고유의 버튼 UI 를 가지고 있음
export default function Button({ children, type = "button", onClick, color }) {
  return (
    <button
      className="rounded-button"
      style={{ backgroundColor: color }}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
