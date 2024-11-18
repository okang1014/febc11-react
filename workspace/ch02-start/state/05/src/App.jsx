import { useRef, useState } from "react";

// 에러 메시지 스타일
const errorStyle = {
  fontSize: "12px",
  color: "red",
  fontWeight: "bold",
};

// 이메일, 전화번호 정규표현식
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cellphoneExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

function App() {
  // 초기 상태값 지정
  // input 은 state 로 관리
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [cellphone, setCellphone] = useState("010");

  // React 는 상태가 변경되면 UI 가 자동으로 렌더링
  // 하지만 반대는 이벤트 핸들러를 통해 setter 함수 호출, 그 이후에 상태가 변경될 수 있음
  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handleCellphoneChange = (event) => {
  //   setCellphone(event.target.value);
  // };

  // 위 방법처럼 모든 값을 따로 하는 방법도 가능하지만
  // 모든 속성을 가지고 있는 객체를 등록하는 방법이 간단
  // 나중에 서버에 요청을 보낼 시에도 더 편리함
  const [user, setUser] = useState({
    name: "",
    email: "",
    cellphone: "010",
  });

  // focus() 함수는 DOM 을 추출해야함
  // 하지만 React 에서는 직접 DOM 에 접근(querySelector, getElementBy 등)하면 안됨
  // React 에서 사용하는 hook -> useRef()
  // 이 함수 또한 import 를 통해 가져와야 함
  // 아래 코드에 해당하는 태그에는 ref={} 속성으로 추가 필요
  const nameElem = useRef(null);
  const emailElem = useRef(null);
  const cellphoneElem = useRef(null);

  // 검증 실패 메시지 상태 관리
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    // 객체의 상태를 변경하고자 한다면, 새로운 객체를 생성해야함
    const newUser = {
      ...user,
      // name 속성으로 변경된 값을 불러와서, 변경된 값만 적용
      [event.target.name]: event.target.value,
    };
    setUser(newUser);
  };

  // form 태그에 적용 이벤트
  const onSubmit = (event) => {
    // 브라우저 기본 동작 취소(submit 동작 취소)
    event.preventDefault();

    let newErrors;

    // 입력값 검증 작업
    if (user.name.trim() === "") {
      newErrors = {
        name: { message: "이름을 입력하세요." },
      };
      // 유효성 검증 실패한 input DOM 에 자동으로 focus
      // 각 DOM 에
      nameElem.current.focus();
    } else if (user.name.trim().length < 2) {
      newErrors = {
        name: { message: "2글자 이상 입력하세요." },
      };
      nameElem.current.focus();
    } else if (user.email.trim() === "") {
      newErrors = {
        email: { message: "이메일을 입력하세요." },
      };
      emailElem.current.focus();
    } else if (emailExp.test(user.email) === false) {
      newErrors = {
        email: { message: "이메일 양식에 맞지 않습니다." },
      };
      emailElem.current.focus();
    } else if (user.cellphone.trim() === "") {
      newErrors = {
        cellphone: { message: "휴대폰 번호를 입력하세요." },
      };
      cellphoneElem.current.focus();
    } else if (cellphoneExp.test(user.cellphone) === false) {
      newErrors = {
        cellphone: { message: "휴대폰 번호 양식에 맞지 않습니다." },
      };
      cellphoneElem.current.focus();
    }

    // 새로운 에러 메시지가 있다면 state 가 변경됨
    // 따라서 리렌더링이 됨
    if (newErrors) {
      // 검증 실패
      setErrors(newErrors);
    } else {
      // 검증 통과
      setErrors({});
      console.log("서버에 전송", user);
    }
  };

  return (
    <>
      <h1>05 회원가입 입력값 상태 관리</h1>

      {/* onSubmit 시 말고 수정할 때 즉각적으로 확인하고 싶다면 onChange 로 변경하면 됨 */}
      <form onSubmit={onSubmit}>
        {/* action => 서버 주소, method => 요청 방식 
        별도 지정이 없으면 get 방식으로 현재 브라우저 페이지에서 새로고침*/}
        <label htmlFor="name">이름</label>
        <input
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          // 해당 ref 를 참조하는 DOM 객체임을 표시
          ref={nameElem}
        />
        <br />
        <div style={errorStyle}>{errors.name?.message}</div>
        {/* errors 에 name 이 있으면, 그 message 를 출력 */}
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          ref={emailElem}
        />
        <br />
        <div style={errorStyle}>{errors.email?.message}</div>

        <label htmlFor="cellphone">휴대폰</label>
        <input
          id="cellphone"
          name="cellphone"
          value={user.cellphone}
          onChange={handleChange}
          ref={cellphoneElem}
        />
        <br />
        <div style={errorStyle}>{errors.cellphone?.message}</div>

        <button type="submit">가입</button>
      </form>

      <p>
        이름: {user.name}
        <br />
        이메일: {user.email}
        <br />
        휴대폰: {user.cellphone}
        <br />
      </p>
    </>
  );
}

export default App;
