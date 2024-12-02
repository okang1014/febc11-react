import PropTypes from "prop-types";
import styles from "./Button.module.css"; // Button.css 파일 Import
import classNames from "classnames";

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
  // colorStyle 변수 별도로 지정
  // const colorStyle = `${styles.button} ${styles[`color-${bg}-${color}`]}`;

  // classname 라이브러리 사용
  const colorStyle = classNames(styles.button, styles[`color-${bg}-${color}`]);

  return (
    <button
      // props 로 전달받은 bg 와 color 를 템플릿 리터럴로 지정하여 클래스 명 지정
      className={colorStyle} // 'className="button color-blue-red"
      // style={{ backgroundColor: color }}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
