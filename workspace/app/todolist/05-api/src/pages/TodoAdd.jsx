import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function TodoAdd() {
  // 입력값 검증 - react hook form 사용
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // 기본 설정 유지

  const onSubmit = (item) => {
    console.log("서버에 전송", item);
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
