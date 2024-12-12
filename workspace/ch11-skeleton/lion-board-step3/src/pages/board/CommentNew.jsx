import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function CommentNew() {
  const axios = useAxiosInstance();

  const { _id } = useParams();

  // const navigate = useNavigate(); // 동일한 페이지 내 이동은 navigate 불필요

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // input field 초기화 함수
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const queryClient = useQueryClient();

  const addComment = useMutation({
    mutationFn: (formData) => axios.post(`/posts/${_id}/replies`, formData),
    onSuccess: () => {
      // alert("댓글이 등록되었습니다."); // alert 생략
      queryClient.invalidateQueries({
        // 상세 조회 데이터를 하위 컴포넌트에 props 로 넘겨주고 댓글 목록을 출력한다면, 상세 조회의 queryKey 를 무효화해야함
        queryKey: ["posts", _id],
        // queryKey: ["replies", _id], // 댓글 등록 이후 곧바로 데이터 fetch 하지 않음
      });
      // navigate(`/${type}/${_id}`); // 현재 페이지, 동일한 페이지에서 이동하는 것이기 때문에 불필요
      // react-hook-form 에서 input field 초기화하는 함수 reset()
      reset();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(addComment.mutate)}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            {...register("content", { required: "내용은 필수입니다." })}
          />
          <InputError target={errors.content} />
        </div>
        <button
          type="submit"
          className="bg-orange-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        >
          댓글 등록
        </button>
      </form>
    </div>
  );
}
