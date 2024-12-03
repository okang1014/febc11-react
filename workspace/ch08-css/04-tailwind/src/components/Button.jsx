import PropTypes from "prop-types";
// import "./Button.css"; // Button.css 파일 Import
// tailwindCSS 를 사용하고, 컴포넌트 내에서 별도 값 정의

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  bg: PropTypes.oneOf(["blue", "red", "yellow", "gray"]), // 사용하는 색은 무조건 배열 내의 항목 중 하나
  color: PropTypes.oneOf(["blue", "red", "black", "white"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  onClick: PropTypes.func,
};

// Button 컴포넌트는 고유의 버튼 UI 를 가지고 있음
export default function Button({
  children,
  bg = "gray",
  color = "black",
  size = "md",
  ...rest // 스타일 외의 속성은 버튼의 속성으로 그대로 적용
  // type = "button",
  // onClick: clickHandler,
}) {
  // return (
  //   <button
  //     // props 로 전달받은 bg 와 color 를 템플릿 리터럴로 지정하여 클래스 명 지정
  //     className={`button color-${bg}-${color}`} // 'className="button color-blue-red"
  //     // style={{ backgroundColor: color }}
  //     type={type}
  //     onClick={clickHandler}
  //   >
  //     {children}
  //   </button>
  // );

  // 사용하고자 하는 스타일을 상위 컴포넌트로부터 전달받을 수 있음, 전달받은 props 속성은 템플릿 리터럴로 사용 가능
  let bgColor = {
    gray: "bg-gray-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  let textColor = {
    black: "text-black",
    white: "text-white",
    blue: "text-blue-500",
    red: "text-red-500",
  };

  let btnSize = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-2 px-6 text-lg",
  };

  return (
    <button
      // [ ] 내부는 상위 컴포넌트로부터 전달받은 bg, color props 이며, 위에 정의한 스타일 객체에서 속성을 꺼내서 클래스에 지정할 수 있음
      className={`${bgColor[bg]} ${textColor[color]} ${btnSize[size]} m-1 rounded-md`}
      {...rest}
    >
      {children}
    </button>
  );
}
