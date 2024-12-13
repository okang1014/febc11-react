import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const { type, _id } = useParams();
  const axios = useAxiosInstance();

  // 수정 작업은 데이터를 받아오는 작업이 필요
  // 1. 새롭게 다시 조회하는 방법이 있고, 2. navigate 를 사용해서 props 로 넘겨주는 방법이 있음
  // 하지만 url 을 공유하는 경우를 대비하여 해당 값을 새롭게 조회하는 방법 선택
  // 새롭게 데이터를 불러오는 경우 성능에는 영향이 있음
  const { data } = useQuery({
    queryKey: ["posts", _id],
    // useParams() 로 획득한 id 값으로 API 서버 요청 전달
    queryFn: () => axios.get(`/posts/${_id}`),
    select: (res) => res.data, // 반환받은 데이터 중 data 객체 추출
    statleTime: 1000 * 10, // 캐시 시간
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 조회된 게시물 정보로 input 의 기본값 설정
    defaultValues: {
      title: data?.item.title,
      content: data?.item.content,
    },
  });

  const queryClient = useQueryClient();

  const updateItem = useMutation({
    // 입력받은 데이터만 서버에 전달, 데이터 수정
    mutationFn: (formData) => axios.patch(`/posts/${_id}`, formData),
    onSuccess: () => {
      alert("게시물이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts", _id] }); // 상세보기에서 캐시된 값을 새로고침
      navigate(`/${type}/${_id}`); // 특정 게시물 타입의 id 에 해당하는 상세페이지로 이동
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <>
      <Helmet>
        <title>게시글 수정 - 멋사컴</title>

        <meta property="og:title" content="게시글 수정 - 멋사컴" />
        <meta
          property="og:description"
          content="멋사컴에서 코딩 정보를 공유하세요."
        />
      </Helmet>
      <main className="min-w-[320px] p-4">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            게시글 수정
          </h2>
        </div>
        <section className="mb-8 p-4">
          <form onSubmit={handleSubmit(updateItem.mutate)}>
            <div className="my-4">
              <label className="block text-lg content-center" htmlFor="title">
                제목
              </label>
              <input
                id="title"
                type="text"
                placeholder="제목을 입력하세요."
                className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                {...register("title", { required: "제목은 필수입니다." })}
              />

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
              />

              <InputError target={errors.content} />
            </div>
            <hr />
            <div className="flex justify-end my-6">
              <button
                type="submit"
                className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                수정
              </button>
              <Link
                to={`/${type}/${_id}`}
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
