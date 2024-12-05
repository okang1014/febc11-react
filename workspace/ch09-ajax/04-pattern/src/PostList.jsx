import FetchOnRender from "./01-FetchOnRender";
import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 목록 조회 API 호출 함수
function fetchPostList() {
  return axios.get("https://11.fesp.shop/posts?type=brunch&delay=4000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 목록 조회 컴포넌트
function PostList() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchPostList().then((res) => {
      setData(res.data);
    }); // axios 는 promise 객체를 반환, then 을 사용해서 콜백함수로 promise 실행 결과를 사용할 수 있음
    // Promise 객체 찾아보기
  }, []);

  // 최초 렌더링 시에는 data 는 undefined, 따라서 return 코드 실행 불가
  // 만일 데이터가 없는 경우(최초 렌더링) 해당 문구를 출력
  if (!data) {
    return <div>게시글 목록 로딩중</div>;
  }

  return (
    <>
      <h2>게시물 {data.item.length}건이 있습니다.</h2>
      <h3>Fetch-on-render 방식</h3>
      <FetchOnRender />
    </>
  );
}

export default PostList;
