import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

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

  const axios = useAxiosInstance();
  const navigate = useNavigate(); // navigate 훅 사용, 특정 페이지로 이동 가능

  const queryClient = useQueryClient();

  const addItem = useMutation({
    // todolist 주소에 item 을 body 로 추가하여 전달, mutate() 가 onSubmit 의 역할을 대신할 예정
    mutationFn: (item) => axios.post(`/todolist`, item),
    onSuccess: () => {
      alert("할 일이 추가되었습니다.");
      reset();
      // 지정한 키의 쿼리 캐시를 무효화
      queryClient.invalidateQueries(["todolist"]);
      // todolist 로 시작되는 쿼리값은 fresh, stale 상태 상관없이 캐시 초기화
      // 할 일을 추가한 이후, 이전 페이지로 이동할 때, 즉각적으로 데이터를 불러오도록 캐시를 초기화, 서버 재요청, 리렌더링 진행
      // 할 일 목록 페이지로 이동(이전 페이지로 이동)
      navigate(-1);
    },
    onError: (err) => {
      console.log("서버에서 에러 응답");
      alert(err?.message || "할 일 추가에 실패했습니다.");
    },
  });

  // useMutation 에서 반환된 mutationFn 이 대체
  // const onSubmit = (item) => {
  //   console.log("서버에 전송", item);

  //   // timeout 수기로 지정해야함
  //   const timer = setTimeout(() => {
  //     xhr.abort(); // 2초 후 서버 요청 취소
  //   }, 2000);

  //   // XHR 객체 생성
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("POST", "https://todo-api.fesp.shop/api/todolist");
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //   xhr.responseType = "json";

  //   xhr.onload = () => {
  //     clearTimeout(timer);

  //     // 서버 정상 응답(200번대)
  //     if (xhr.status >= 200 && xhr.status < 300) {
  //       console.log(xhr.response);
  //       alert("할 일이 추가되었습니다."); // 성공 메시지 출력

  //       // react-hook-form 에서 제공하는 함수
  //       setFocus("title"); // 서버 요청 성공 시 제목 영역에 포커스, 포커스를 먼저 실시 후 초기화
  //       reset(); // 제목 영역의 내용 초기화
  //     } else {
  //       // 서버 응답 상태 4XX, 5XX
  //       console.log("서버에서 에러 응답", xhr.status, xhr.response);
  //       alert(xhr.response.error?.message || "할 일 추가에 실패했습니다."); // response 에 에러 메시지가 있다면 에러 메시지 출력, 그렇지 않다면 뒤의 문구 출력
  //     }
  //   };

  //   // timeout 되어 abort 로 서버 요청이 중단된 경우 실행할 코드
  //   xhr.onabort = () => {
  //     alert("타임아웃");
  //   };

  //   // 서버 자체에 연결할 수 없는 오류
  //   xhr.onerror = () => {
  //     console.error("네트워크 오류");
  //     alert(xhr.response.error?.message);
  //   };

  //   // 서버 요청 전송
  //   xhr.send(JSON.stringify(item)); // 요청을 보낼 때, 객체를 통째로 보낼 수 없음, JSON.stringify() 로 변환하여 전홍
  // };

  return (
    <div id="main">
      <h2>할일 추가</h2>
      <div className="todo">
        {/* handleSubmit 은 react-hook-form 라이브러리에서 제공하는 함수, 자동으로 검증이 끝난 item 객체가 내부에 전달됨 */}
        <form onSubmit={handleSubmit(addItem.mutate)}>
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
