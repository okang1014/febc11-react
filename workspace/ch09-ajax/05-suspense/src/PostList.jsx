import { useSuspenseQuery } from "@tanstack/react-query";
import FetchAsYouRender from "./03-FetchAsYouRender";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";

// 게시글 목록 조회 API 호출 함수
function fetchPostList() {
  return axios.get("https://11.fesp.shop/posts?type=brunch&delay=2000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 목록 조회 컴포넌트
function PostList() {
  const { data } = useSuspenseQuery({
    // suspense: true, // useQuery 사용 시 option 을 지정하면 suspense 컴포넌트와 함께 연동
    queryKey: ["posts"],
    queryFn: () => fetchPostList(), // promise 객체 반환, 자동으로 suspense 컴포넌트에 throw
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  return (
    <>
      <h2>게시물 {data.item.length}건이 있습니다.</h2>
    </>
  );
}

export default PostList;
