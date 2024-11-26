import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// TodoAdd 는 XMLHttpRequest 사용
function TodoAdd() {
  // 입력값 검증 - react hook form 사용
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    setFocus,
    formState: { errors },
  } = useForm(); // 기본 설정 유지

  const onSubmit = (item) => {
    console.log("서버에 전송", item);

    // timeout 수기로 지정해야함
    const timer = setTimeout(() => {
      xhr.abort(); // 2초 후 서버 요청 취소
    }, 2000);

    // XHR 객체 생성
    const xhr = new XMLHttpRequest();

    // 서버 요청 정보 추가
    // xhr.open("POST", "https://todo-api.fesp.shop/api/todolist"); // 첫 매개변수 request method, 다음 매개변수는 요청할 서버 주소
    xhr.open("POST", "https://todo-api.fesp.shop/api/todolist?delay=10000000"); // ?delay 이후에는 delay 시간 지정 가능(timeout 지정용)

    xhr.setRequestHeader("Content-Type", "application/json"); // 서버에 전달되는 body 데이터 타입 지정(JSON)
    xhr.responseType = "json"; // 서버로부터 전달받는 데이터 타입 지정(JSON), response 에 저장되는 응답 데이터가 JSON.parse() 결과로 저장됨
    // 서버로부터 응답이 도착하면 실행되는 함수 등록

    xhr.onload = () => {
      // 요청이 도착한 경우, 직접 지정한 타임아웃 코드 실행을 취소해야함
      // 매 요청마다 취소하는 함수를 지정해주어야 함.
      clearTimeout(timer);

      // 서버 정상 응답(200번대)
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.response);
        alert("할 일이 추가되었습니다."); // 성공 메시지 출력

        // react-hook-form 에서 제공하는 함수
        setFocus("title"); // 서버 요청 성공 시 제목 영역에 포커스, 포커스를 먼저 실시 후 초기화
        reset(); // 제목 영역의 내용 초기화
      } else {
        // 서버 응답 상태 4XX, 5XX
        console.log("서버에서 에러 응답", xhr.status, xhr.response);
        alert(xhr.response.error?.message || "할 일 추가에 실패했습니다."); // response 에 에러 메시지가 있다면 에러 메시지 출력, 그렇지 않다면 뒤의 문구 출력
      }
    };

    // timeout 되어 abort 로 서버 요청이 중단된 경우 실행할 코드
    xhr.onabort = () => {
      alert("타임아웃");
    };

    // 서버 자체에 연결할 수 없는 오류
    xhr.onerror = () => {
      console.error("네트워크 오류");
      alert(xhr.response.error?.message);
    };

    //XMLHttpRequest 에서는 서버 응답 에러와 서버 요청 에러 둘 다 제공해주어야함

    // 서버 요청 전송
    xhr.send(JSON.stringify(item)); // 요청을 보낼 때, 객체를 통째로 보낼 수 없음, JSON.stringify() 로 변환하여 전홍
  };

  return (
    <div id="main">
      <h2>할일 추가</h2>
      <div className="todo">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">제목 :</label>
          <input
            type="text"
            id="title"
            autoFocus
            {...register("title", {
              required: "제목을 입력하세요.",
            })}
          />
          {/* error 메시지 출력 */}
          <div className="input-error">{errors.title?.message}</div>
          <br />
          <label htmlFor="content">내용 :</label>
          <textarea
            id="content"
            cols="23"
            rows="5"
            {...register("content", {
              required: "내용을 입력하세요.",
            })}
          ></textarea>
          <div className="input-error">{errors.content?.message}</div>
          <br />
          <button type="submit">추가</button>
          {/* submit 타입 버튼으로 변경 */}
          <Link to="/list">취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoAdd;
