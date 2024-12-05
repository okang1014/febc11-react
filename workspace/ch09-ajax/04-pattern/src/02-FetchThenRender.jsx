import axios from "axios";
import { useEffect, useState } from "react";

// 게시글과 댓글 목록 조회 동시에 진행
function fetchData() {
  // Promise.all - 여러 promise 객체를 배열로 담아서 동시에 실행
  return Promise.all([fetchPost(), fetchReplies()]).then(([post, replies]) => ({
    post: post.data,
    replies: replies.data,
  }));
  // Promise 객체 내의 비동기 함수가 성공되었을 때, 함수 실행 결과로 콜백함수 실행
}

// 해당 함수는 상위 컴포넌트에서 import 될 때 실행
// 서버로부터 데이터를 먼저 fetch
// 컴포넌트 렌더링 전에 실행된다
const promise = fetchData();

// 게시글 조회 API 호출 함수
function fetchPost() {
  return axios.get("https://11.fesp.shop/posts/1?delay=3000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세 조회 페이지
function FetchThenRender() {
  // 두 개의 분리된 상태로 관리
  const [post, setPost] = useState();
  const [replies, setReplies] = useState();

  useEffect(() => {
    // promise 객체 실행 완료 후 실행될 코드
    promise.then((res) => {
      setPost(res.post);
      setReplies(res.replies);
    });
    // Promise 객체 찾아보기
  }, []);

  if (!post) {
    return <div>게시글 로딩중</div>;
  }

  return (
    <>
      <h4>{post.item.title}</h4>
      {/* 하위 컴포넌트에 props 로 댓글 객체 전달 */}
      <Replies replies={replies} />
    </>
  );
}

// 댓글 목록 조회 API 호출 함수
function fetchReplies() {
  return axios.get("https://11.fesp.shop/posts/1/replies?delay=2000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 상위 컴포넌트로부터 받아온 replies props 사용
function Replies({ replies }) {
  // 부모 컴포넌트에서 이미 받았기 때문에 불필요
  // const [data, setData] = useState();
  // useEffect(() => {
  //   fetchReplies().then((res) => {
  //     setData(res.data);
  //   }); // axios 는 promise 객체를 반환, then 을 사용해서 콜백함수로 promise 실행 결과를 사용할 수 있음
  //   // Promise 객체 찾아보기
  // }, []);

  if (!replies) {
    return <div>댓글 로딩중</div>;
  }

  // 서버로부터 받아온 데이터 배열을 map 함수를 사용하여 각 배열의 항목마다 li 태그를 생성
  const list = replies.item.map((item) => (
    <li key={item._id}>{item.content}</li>
  ));

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchThenRender;
