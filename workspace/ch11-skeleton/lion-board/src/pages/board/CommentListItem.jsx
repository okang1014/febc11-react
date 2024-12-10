import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

CommentListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.shape({
        path: PropTypes.string,
      }),
    }).isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CommentListItem({ item }) {
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const { _id } = useParams();

  // 댓글 삭제 기능
  const removeItem = useMutation({
    // ❓mutationFn 에 매개변수를 지정하지 않아도 되는 이유 - 컴포넌트 내부에 이미 mutationFn 에 사용되는 값이 정의되어 있기 때문에 매개변수를 전달하지 않아도 전달한 것처럼 작동
    // 그렇다면 왜 인자를 지정해주어야 하는가?
    // mutationFn 의 독립성 그리고 일부의 순수성을 확보하기 위함
    // 1. 인자를 지정하지 않는 경우, 함수는 외부의 요인에 의해 영향을 받게됨. - 만일 item 이나 _id 식별자가 변경되는 경우, 함수도 수정을 해주어야함. 유지보수성 저하
    // mutationFn: () => axios.delete(`/posts/${_id}/replies/${item._id}`),
    // 2. 인자를 지정하는 경우, 해당 함수에 대입되는 값은 함수를 호출하는 쪽에서 지정, 따라서 함수 자체를 수정할 필요가 없어짐
    // 그리고 해당 함수는 컴포넌트 내부 요인에 영향을 받지 않기 때문에 컴포넌트 외부에 선언할 수 있고, 따라서 해당 로직이 필요한 컴포넌트에서도 사용할 수 있게 됨
    mutationFn: (_id, item_id) =>
      axios.delete(`/posts/${_id}/replies/${item_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", _id] });
    },
  });

  // const onDelete = (e) => {
  //   e.preventDefault();
  //   console.log(item._id);
  //   removeItem.mutate();
  // };

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        {/* 조건부 렌더링, 이미지가 있는 사용자의 경우만 이미지 출력 */}
        {item.user.image && (
          <img
            className="w-8 mr-2 rounded-full"
            src={`https://11.fesp.shop${item.user.image.path}`}
            alt={`${item.user.name || "익명"} 프로필 이미지`}
          />
        )}
        <Link to="" className="text-orange-400">
          {item.user.name || "익명"}
        </Link>
        <time className="ml-auto text-gray-500" dateTime={`${item.createdAt}`}>
          {item.createdAt}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <pre className="whitespace-pre-wrap text-sm">{item.content}</pre>
        <button
          type="submit"
          className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          onClick={() => {
            removeItem.mutate(_id, item._id);
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
