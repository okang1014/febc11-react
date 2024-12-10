import CommentListItem from "@pages/board/CommentListItem";
import CommentNew from "@pages/board/CommentNew";
<<<<<<< HEAD

export default function CommentList() {
  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 2개</h4>

      <CommentListItem />
=======
import PropTypes from "prop-types";

CommentList.propTypes = {
  data: PropTypes.array,
};
export default function CommentList({ data=[] }) {

  const list = data.map(item => <CommentListItem key={item._id} item={ item } />);

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 { list.length }개</h4>

      { list }
>>>>>>> b2c9403fa9cef9b4f17a294222cf4f529bc7bb22

      <CommentNew />

    </section>
  );
}