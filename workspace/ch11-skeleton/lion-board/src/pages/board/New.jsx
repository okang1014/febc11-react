import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputError from "@components/InputError";
import { Helmet } from "react-helmet-async";

export default function New() {
  // useNavigate 훅을 사용해서 특정 페이지로 이동
  const navigate = useNavigate();

  // react-hook-form 을 사용하여 사용자 input 처리
  // 아래 세 가지는 리액트 훅 폼을 사용하는 경우 필수
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axios = useAxiosInstance();
  // /:type
  // localhost/info => useParams() 의 리턴값 {type: info}
  // useParams 로 id 값을 추가로 추출, type 을 굳이 지정하지 않아도 됨
  const { type, _id } = useParams();

  const queryClient = useQueryClient();

  const addItem = useMutation({
    // React-hook-form 에서 검증이 끝난 사용자 입력 data 를 formData 로 전송
    mutationFn: (formData) => {
      // formData 객체에 type 속성 추가
      formData.type = type;
      // 화살표 함수 body 내부에 여러 줄의 코드가 있는 경우, {} 로 묶고 return 문이 필요
      return axios.post(`/posts`, formData);
    },
    onSuccess: () => {
      alert("새로운 게시물이 등록되었습니다.");
      // 글 작성 완료 직후 다시 리스트 화면으로 돌아갈 때, 즉각 반영이 되지 않는 이유는 캐시된 결과를 우선적으로 화면에 출력하기 때문
      // 따라서 캐시된 쿼리를 무효화하여 곧바로 서버 재요청, 새로운 데이터 불러와서 출력
      queryClient.invalidateQueries({ queryKey: ["posts", type] });
      navigate(`/${type}`); // 작성한 게시판 페이지로 이동, 현 url 을 절대경로로 변경
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <Helmet>
        <title>게시글 등록 - 멋사컴</title>

        <meta property="og:title" content="게시글 등록 - 멋사컴" />
        <meta
          property="og:description"
          content="나만 알 수 없는 코딩 정보를 공유하세요."
        />
      </Helmet>
      <main className="min-w-[320px] p-4">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            게시글 등록
          </h2>
        </div>
        <section className="mb-8 p-4">
          <form onSubmit={handleSubmit(addItem.mutate)}>
            <div className="my-4">
              <label className="block text-lg content-center" htmlFor="title">
                제목
              </label>
              <input
                id="title"
                type="text"
                placeholder="제목을 입력하세요."
                className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                // input 요소의 이름과 입력 조건값(객체)을 register 함수에 전달
                // register 함수는 name 값을 갖는 객체를 반환
                {...register("title", { required: "제목은 필수입니다." })}
              />
              {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400"> */}
              {/* title 의 에러 메시지가 있는 경우 출력, 없는 경우, undefined 로 출력 X, 
              handleSubmit 함수가 입력값 검증 후 에러 추가, 에러 상태 변경 */}
              {/* {errors.title?.message} */}
              {/* </p> */}
              <InputError target={errors.title} />
            </div>
            <div className="my-4">
              <label className="block text-lg content-center" htmlFor="content">
                내용
              </label>
              <textarea
                id="content"
                rows="15"
                placeholder="내용을 입력하세요."
                className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                {...register("content", { required: "내용은 필수입니다." })}
              ></textarea>
              <InputError target={errors.content} />
            </div>
            <hr />
            <div className="flex justify-end my-6">
              <button
                type="submit"
                className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                등록
              </button>
              <Link
                to="/info"
                className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                취소
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
