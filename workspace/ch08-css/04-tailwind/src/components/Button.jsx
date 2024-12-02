import PropTypes from "prop-types";
import "./Button.css"; // Button.css 파일 Import

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.oneOf(["blue", "red", "yellow", "brown"]), // 사용하는 색은 무조건 배열 내의 항목 중 하나
  bg: PropTypes.oneOf(["blue", "red", "yellow", "grey"]),
  onClick: PropTypes.func,
};

// Button 컴포넌트는 고유의 버튼 UI 를 가지고 있음
export default function Button({
  children,
  type = "button",
  color,
  bg,
  onClick: clickHandler,
}) {
  return (
    <button
      // props 로 전달받은 bg 와 color 를 템플릿 리터럴로 지정하여 클래스 명 지정
      className={`button color-${bg}-${color}`} // 'className="button color-blue-red"
      // style={{ backgroundColor: color }}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
