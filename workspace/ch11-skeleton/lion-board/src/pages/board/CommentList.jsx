import CommentListItem from "@pages/board/CommentListItem";
import CommentNew from "@pages/board/CommentNew";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

CommentList.propTypes = {
  replies: PropTypes.array,
};

export default function CommentList({ replies }) {
  // if (!replies) {
  //   return <div>댓글 로딩 중...</div>;
  // }
  if (!replies) {
    return (
      <section className="mb-8">
        <h4 className="mt-8 mb-4 ml-2">댓글 0개</h4>

        <div>표시할 댓글이 없습니다.</div>

        <CommentNew />
      </section>
    );
  }

  const comments = replies.map((item) => (
    <CommentListItem key={item._id} item={item} />
  ));

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {replies.length}개</h4>

      {/* <CommentListItem /> */}
      {comments}

      <CommentNew />
    </section>
  );
}
