import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

// 게시글 조회 API 호출 함수
function fetchPost() {
  return axios.get("https://11.fesp.shop/posts/1?delay=3000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세 조회 페이지
function FetchAsYouRender() {
  // const [data, setData] = useState();
  // useEffect(() => {
  //   fetchPost().then((res) => {
  //     setData(res.data);
  //   });
  // }, []);

  const { data } = useSuspenseQuery({
    // suspense: true, // useQuery 사용 시 option 을 지정하면 suspense 컴포넌트와 함께 연동
    queryKey: ["posts", 1],
    queryFn: () => fetchPost(), // promise 객체 반환, 자동으로 suspense 컴포넌트에 throw
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  // suspense 에 throw 되고, 아래 코드가 실행되지 않음
  // if (!data) {
  //   return <div>게시글 로딩중</div>;
  // }

  return (
    <>
      <h4>{data.item.title}</h4>
    </>
  );
}

// 댓글 목록 조회 API 호출 함수
function fetchReplies() {
  return axios.get("https://11.fesp.shop/posts/1/replies?delay=4000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 댓글 목록 조회 페이지 -> FetchOnRender 컴포넌트 아래에 삽입
export function Replies() {
  const { data } = useSuspenseQuery({
    // suspense: true, // useQuery 사용 시 option 을 지정하면 suspense 컴포넌트와 함께 연동
    queryKey: ["posts", 1, "replies"],
    queryFn: () => fetchReplies(), // promise 객체 반환, 자동으로 suspense 컴포넌트에 throw
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  // 서버로부터 받아온 데이터 배열을 map 함수를 사용하여 각 배열의 항목마다 li 태그를 생성
  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchAsYouRender;
