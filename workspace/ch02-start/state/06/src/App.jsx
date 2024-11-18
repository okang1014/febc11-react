// import { useRef, useState } from "react";
// custom hook 이 내부적으로 react 의 훅을 사용 => 생략 가능
import { useForm } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    // useForm 의 기본값
    defaultValues: {
      // useForm 의 initialValue 로 등록
      name: "",
      email: "",
      cellphone: "010",
    },
  });
  // useForm 은 register, handleSubmit, watch 함수와 formState 객체를 반환
  // register - input 요소에서 사용

  // 아래의 모든 검증 조건을 react-hook-form 으로 모든 검증 로직 대체 가능
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   cellphone: "010",
  // });

  // const nameElem = useRef(null);
  // const emailElem = useRef(null);
  // const cellphoneElem = useRef(null);

  // const [errors, setErrors] = useState({});

  // const handleChange = (event) => {
  //   const newUser = {
  //     ...user,
  //     [event.target.name]: event.target.value,
  //   };
  //   setUser(newUser);
  // };

  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   let newErrors;

  //   // 입력값 검증 작업
  //   if (user.name.trim() === "") {
  //     newErrors = {
  //       name: { message: "이름을 입력하세요." },
  //     };
  //     nameElem.current.focus();
  //   } else if (user.name.trim().length < 2) {
  //     newErrors = {
  //       name: { message: "2글자 이상 입력하세요." },
  //     };
  //     nameElem.current.focus();
  //   } else if (user.email.trim() === "") {
  //     newErrors = {
  //       email: { message: "이메일을 입력하세요." },
  //     };
  //     emailElem.current.focus();
  //   } else if (emailExp.test(user.email) === false) {
  //     newErrors = {
  //       email: { message: "이메일 양식에 맞지 않습니다." },
  //     };
  //     emailElem.current.focus();
  //   } else if (user.cellphone.trim() === "") {
  //     newErrors = {
  //       cellphone: { message: "휴대폰 번호를 입력하세요." },
  //     };
  //     cellphoneElem.current.focus();
  //   } else if (cellphoneExp.test(user.cellphone) === false) {
  //     newErrors = {
  //       cellphone: { message: "휴대폰 번호 양식에 맞지 않습니다." },
  //     };
  //     cellphoneElem.current.focus();
  //   }

  //   if (newErrors) {
  //     // 검증 실패
  //     setErrors(newErrors);
  //   } else {
  //     // 검증 통과
  //     setErrors({});
  //     console.log("서버에 전송", user);
  //   }
  // };

  // 검증을 모두 통과한 경우에만 해당 함수 실행, name, email, cellphone 속성을 담은 객체를 반환
  const onSubmit = (user) => {
    console.log("서버에 전송", user);
  };

  return (
    <>
      <h1>06 회원가입 입력값 검증(feat. react-hook-form)</h1>

      {/* React-hook-form 의 handelSubmit 에서 검증을 통과한 경우, onSubmit 함수가 호출 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          // react-hook-form 의 register 함수 호출, id 는 포함하지 않음
          // 아래 내용을 register 함수에 전달하여 호출하게 된다면 자동으로 검증 로직을 만들어 줌
          {...register("name", {
            required: "이름을 입력하세요.", // 필수 입력 정보
            minLength: {
              // 이름의 경우, 최소 입력 길이 전달, 검증 조건을 전달
              value: 2, // 최소 입력 길이
              message: "2글자 이상 입력하세요.", // 안내 메시지
            },
          })}
          // 함수 호출 결과로 객체 반환, 전개 연산자로 풀면 자동으로 name, value, onChange, ref 속성이 자동으로 추가
          // 첫번째 매개변수는 name 을 가지는 요소
          // 두번째 매개변수는 검증 규칙을 객체로 전달
          // name="name"
          // value={user.name}
          // onChange={handleChange}
          // ref={nameElem}
        />
        <br />
        <div style={errorStyle}>{errors.name?.message}</div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          {...register("email", {
            required: "이메일을 입력하세요.",
            pattern: {
              // 검증 조건
              // 정규 표현식 검증
              value: emailExp, // 위에서 선언한 정규 표현식
              message: "이메일 양식에 맞지 않습니다.",
            },
          })}
        />
        <br />
        <div style={errorStyle}>{errors.email?.message}</div>

        <label htmlFor="cellphone">휴대폰</label>
        <input
          id="cellphone"
          {...register("cellphone", {
            required: "휴대폰 번호을 입력하세요.",
            pattern: {
              // 검증 조건
              // 정규 표현식
              value: cellphoneExp,
              message: "휴대폰 번호 양식에 맞지 않습니다.",
            },
          })}
        />
        <br />
        <div style={errorStyle}>{errors.cellphone?.message}</div>

        <button type="submit">가입</button>
      </form>

      <p>
        {/* form input 의 name 에 해당하는 값을 꺼내서 출력 */}
        이름: {watch("name")}
        <br />
        이메일: {watch("email")}
        <br />
        휴대폰: {watch("cellphone")}
        <br />
      </p>
    </>
  );
}

export default App;
