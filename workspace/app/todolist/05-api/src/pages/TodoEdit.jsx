import useAxiosInstance from "@hooks/useAxiosInstance";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function TodoEdit() {
  const { item } = useOutletContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: item.title,
      content: item.content,
      done: item.done,
    },
  }); // react-hook-form 초기값 지정
  // 과거 데이터를 채워놓고 수정 시작

  // axios 인스턴스
  const axios = useAxiosInstance();

  const onSubmit = async (formData) => {
    try {
      // e.preventDefault(); // handleSubmit 에 내부적으로 구현되어 있음

      // useAxios({url: '/todolist', method: 'PATCH', body: {title: '', content: ''}});
      // 커스텀 훅은 컴포넌트 가장 상위에서만 사용되어야 하며, 이벤트 핸들러 내에 직접 사용할 수 없다
      // 조회는 페이지 로딩 시 사용 가능하지만, 등록, 수정, 삭제는 사용자의 액션이 필요하기에 단순 훅으로는 사용이 어렵다
      // useAxios, useFetch 라이브러리는 페이지 로딩 후 데이터를 조회할 때만 사용 가능하다

      // TODO : API 서버에 수정 요청
      await axios.patch(`/todolist/${item._id}`, formData);
      // 두 번째 매개변수는 body (수정된 내용)
      // request 의 body 에 formData 를 추가하여 서버에 요청

      alert("할 일이 수정되었습니다.");

      navigate(-1);
    } catch (err) {
      console.log(err);
      alert("할 일 수정에 실패하였습니다.");
    }
  };

  return (
    <>
      <h2>할일 수정</h2>
      <div className="todo">
        {/* handleSubmit 은 react-hook-form 에서 제공되는 메서드 */}
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
          />
          <div className="input-error">{errors.content?.message}</div>
          <br />
          <label htmlFor="done">완료 :</label>
          {/*  */}
          <input type="checkbox" id="done" {...register("done")} />
          <br />
          <button type="submit">수정</button>
          <Link to={`/list/${item._id}`}>취소</Link>
        </form>
      </div>
    </>
  );
}

export default TodoEdit;
