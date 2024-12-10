import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentList from "@pages/board/CommentList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Detail() {
  // store 로부터 User 상태 획득
  // 전체 객체를 받기 때문에 User 는 구조분해할당으로 추출
  const { user } = useUserStore();
  const navigate = useNavigate();
  const axios = useAxiosInstance();

  // /:type
  // localhost/info => useParams() 의 리턴값 {type: info}
  // useParams 로 id 값을 추가로 추출, type 을 굳이 지정하지 않아도 됨
  const { type, _id } = useParams();

  const { data } = useQuery({
    queryKey: ["posts", _id],
    // useParams() 로 획득한 id 값으로 API 서버 요청 전달
    queryFn: () => axios.get(`/posts/${_id}`),
    select: (res) => res.data, // 반환받은 데이터 중 data 객체 추출
    statleTime: 1000 * 10, // 캐시 시간
  });

  console.log(data);

  const queryClient = useQueryClient();

  // 게시물 삭제 기능
  const removeItem = useMutation({
    mutationFn: (_id) => axios.delete(`/posts/${_id}`),
    onSuccess: () => {
      alert("게시물이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts", type] });
      navigate(`/${type}`); // 작성한 게시판 페이지로 이동, 현 url 을 절대경로로 변경
    },
    // axios 에 에러 콘솔 출력 기능 존재하기 때문에 onError 생략
  });

  // react-hook-form 을 사용하지 않기 때문에 이벤트 핸들러로 등록
  const onSubmit = (event) => {
    event.preventDefault();
    removeItem.mutate(_id);
  };

  if (!data) {
    return <div>로딩 중...</div>;
  }
  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <form onSubmit={onSubmit}>
          <div className="font-semibold text-xl">제목 : {data.item.title}</div>
          <div className="text-right text-gray-400">
            작성자 : {data.item.user.name}
          </div>
          <div className="mb-4">
            <div>
              <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
                {data.item.content}
              </pre>
            </div>
            <hr />
          </div>
          <div className="flex justify-end my-4">
            <Link
              to={`/${type}`}
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              목록
            </Link>

            {/* 상태에 저장된 User 의 id 와 게시글 조회시 불러온 데이터의 id 정보가 일치하는 경우에만 표시 */}
            {/* 즉 사용자 본인에게만 보이는 영역 */}
            {user?._id === data.item.user._id && (
              <>
                <Link
                  to={`/${type}/${_id}/edit`}
                  className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                >
                  수정
                </Link>
                <button
                  // button type 이 submit 인 경우, form 에 onSubmit 이벤트 등록, button type 이 button 인 경우, button 에 onClick 이벤트 등록
                  type="submit"
                  className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </form>
      </section>

      <CommentList replies={data.item.replies} />
    </main>
  );
}
