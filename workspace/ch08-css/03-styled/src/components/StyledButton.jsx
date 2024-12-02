import PropTypes from "prop-types";
import styled from "styled-components";

// styled-components 라이브러리를 사용
// 하나의 컴포넌트 내부에 스타일과 컴포넌트를 한 번에 정의, 적용

// 기본 버튼 스타일 - 스타일이 적용된 버튼 컴포넌트
// 상위 컴포넌트로부터 전달받은 props 의 bg, color 를 적용, 만일 props 로 전달받지 않은 경우 default 로 지정
// 템플릿 리터럴에 함수로 전달, 동적으로 css 속성값 지정 가능
const BasicButtonStyle = styled.button`
  background-color: ${(props) => props.bg || "#4caf50"}; /* Green background */
  border: none; /* Remove borders */
  color: ${(props) => props.color || "white"}; /* White text */
  padding: 6px 18px; /* Padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display as inline-block */
  font-size: ${(props) => props.size || "16px"}; /* Font size */
  margin: 4px 2px; /* Margin */
  cursor: pointer; /* Cursor pointer */
  border-radius: 6px; /* Border radius */
`;

// 스타일을 상속 받아서 사용 - styled 에 상속받고 싶은 스타일을 인자로 전달할 수 있음, 기본 버튼의 스타일을 상속받고, 추가로 지정할 스타일만 템플릿 리터럴로 지정
const SubmitButtonStyle = styled(BasicButtonStyle)`
  background-color: pink;
`;

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

// ...rest 에는 배열로 App 에서 정의한 props 를 그대로 적용
export function Button({ children, ...rest }) {
  // BasicButtonStyle 에 적용된 스타일이 적용된 버튼 컴포넌트 반환(bg, color, onClick 등)
  return (
    <BasicButtonStyle type="button" {...rest}>
      {children}
    </BasicButtonStyle>
  );
}

Submit.propTypes = {
  children: PropTypes.string.isRequired,
};

export function Submit({ children, ...rest }) {
  // BasicButtonStyle 에 적용된 스타일이 적용된 버튼 컴포넌트 반환(bg, color, onClick 등)
  return (
    <SubmitButtonStyle type="submit" {...rest}>
      {children}
    </SubmitButtonStyle>
  );
}
