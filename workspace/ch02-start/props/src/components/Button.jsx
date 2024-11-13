import "./Button.css"; // Button.css 파일 Import

// Button 컴포넌트는 고유의 버튼 UI 를 가지고 있음
export default function Button({ children, type = "button", onClick, color }) {
  // default parameter 를 사용하여, 상위 컴포넌트로부터 button type 이 전달되지 않는 경우는 button type 은 자동으로 button
  // 별도의 type 을 지정하고 싶으면 상위 컴포넌트에서 지정, 하위 컴포넌트로 속성 전달
  // 상위 컴포넌트 태그의 자식 element 가 하위 컴포넌트에 전달될 때 children 이라는 변수명을 사용해야함
  // 필요에 의해 상위 컴포넌트로 전달 받는 속성의 이름을 변경하고자 한다면 onClick: eventHandler 형식으로 변경할 수 있음
  return (
    // 상위 컴포넌트로부터 전달 받은 props(children - 상위 컴포넌트의 하위 element, type, onClick) 를 속성에 추가할 수 있음
    // 상위 컴포넌트에서 스타일 속성 값을 사용할 수 있음
    // style 속성에 {} 사이에 객체 형태로 property: value 를 추가해야 함
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
