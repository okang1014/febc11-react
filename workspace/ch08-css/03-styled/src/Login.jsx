// import Button from "@components/Button";
import { Button, Submit } from "@components/StyledButton"; // styled component 로 컴포넌트 설정
import "./Login.css";
function Login() {
  return (
    <div className="container">
      <h2>Login</h2>
      <form className="form">
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="input color-red-blue"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="input color-blue-red"
            required
          />
        </div>
        <Button bg="grey" color="blue" size="12px">
          회원가입
        </Button>
        <Button bg="yellow" color="brown" size="10px">
          카카오 로그인
        </Button>
        <Submit size="20px">로그인</Submit>
        {/* Button styled-component 의 스타일을 상속받은 Submit 버튼 컴포넌트를 사용, 배경색만 변경 */}
      </form>
    </div>
  );
}

export default Login;
