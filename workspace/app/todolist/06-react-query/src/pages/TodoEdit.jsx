import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

  // 수정 작업 axios ver.
  // const onSubmit = async (formData) => {
  //   try {
  //     await axios.patch(`/todolist/${item._id}`, formData);
  //     // 두 번째 매개변수는 body (수정된 내용)

  //     alert("할 일이 수정되었습니다.");

  //     // 상세보기로 이동
  //     navigate(-1);
  //     // refetch 를 호출하게 된다면 상태는 새롭게 호출되면 변경됨, 따라서 페이지 리렌더링 진행
  //     refetch();
  //   } catch (err) {
  //     console.log(err);
  //     alert("할 일 수정에 실패하였습니다.");
  //   }
  // };

  const queryClient = useQueryClient();

  // 수정 작업 React query ver.
  const editItem = useMutation({
    // react-hook-form 에서 수정된 데이터 검증 후 formData 로 전달
    mutationFn: (formData) => axios.patch(`/todolist/${item._id}`, formData),
    onSuccess: () => {
      alert("할 일이 수정되었습니다.");
      // todolist 로 시작하는 쿼리 캐시 무효화, 서버 재요청
      // item._id 값 추가해서 해당 id 값에 대한 서버 재요청도 함께 실시
      // invalidateQueries 에 전달된 배열에 해당하는 쿼리가 캐시 무효화, 새로고침
      queryClient.invalidateQueries({ queryKey: ["todolist", item._id] });
      // 성공 시, 이전 페이지(상세페이지)로 이동
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
      alert("할 일 수정에 실패했습니다.");
    },
  });

  return (
    <>
      <h2>할일 수정</h2>
      <div className="todo">
        {/* handleSubmit 은 react-hook-form 에서 제공되는 메서드 */}
        <form onSubmit={handleSubmit(editItem.mutate)}>
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
