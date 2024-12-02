import Button from "@components/Button";
import styles from "./Login.module.css";
function Login() {
  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.form}>
        {/* 복합어 클래스 명의 경우, 대괄호 접근법 사용 */}
        <div className={styles["input-group"]}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            // 다수의 클래스를 지정하는 경우, 템플릿 리터럴 사용
            className={`${styles.input} ${styles["color-red-blue"]}`}
            // className="input color-red-blue"
            required
          />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className={`${styles.input} ${styles["color-blue-red"]}`}
            required
          />
        </div>
        <Button bg="grey" color="blue">
          회원가입
        </Button>
        <Button bg="yellow" color="brown">
          카카오 로그인
        </Button>
        <Button type="submit">로그인</Button>
        {/* submit 버튼으로 별도 타입 지정 */}
      </form>
    </div>
  );
}

export default Login;
