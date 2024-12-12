import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentListItem from "@pages/board/CommentListItem";
import CommentNew from "@pages/board/CommentNew";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

CommentList.propTypes = {
  replies: PropTypes.array,
};

// default (댓글 없는 경우)는 빈 배열
export default function CommentList({ replies = [] }) {
  // 상세 조회에서 props 로 전달받는 ver
  const comments = replies.map((item) => (
    <CommentListItem key={item._id} item={item} />
  ));

  // if (!replies) {
  //   return <div>댓글 로딩 중...</div>;
  // }
  // if (!replies) {
  //   return (
  //     <section className="mb-8">
  //       <h4 className="mt-8 mb-4 ml-2">댓글 0개</h4>

  //       <div>표시할 댓글이 없습니다.</div>

  //       <CommentNew />
  //     </section>
  //   );
  // }

  // 후기 목록을 따로 조회하는 것이 좋음 - pagination 기능 등 유리한 측면이 많음

  // 댓글 데이터를 fetch 하는 ver
  // const axios = useAxiosInstance();

  // // /:type
  // // localhost/info => useParams() 의 리턴값 {type: info}
  // const { type } = useParams();

  // const { data } = useQuery({
  //   queryKey: ["posts", type],
  //   queryFn: () => axios.get("/posts", { params: { type } }), // params 속성으로 config 추가. params 를 type=brunch 로 지정
  //   select: (res) => res.data, // 반환받은 데이터 중 data 객체 추출
  //   staleTime: 1000 * 10, // 캐시 시간
  // });

  // console.log(data);

  // if (!data) {
  //   return <div>로딩 중...</div>;
  // }

  // const comments = data.item.map((item) => (
  //   <CommentListItem key={item._id} item={item} />
  // ));

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {comments.length}개</h4>

      {/* <CommentListItem /> */}
      {comments}

      <CommentNew />
    </section>
  );
}
