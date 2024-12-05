import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 조회 API 호출 함수
function fetchPost() {
  return axios.get("https://11.fesp.shop/posts/1?delay=3000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세 조회 페이지
function FetchOnRender() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchPost().then((res) => {
      setData(res.data);
    }); // axios 는 promise 객체를 반환, then 을 사용해서 콜백함수로 promise 실행 결과를 사용할 수 있음
    // Promise 객체 찾아보기
  }, []);

  if (!data) {
    return <div>게시글 로딩중</div>;
  }

  return (
    <>
      {/* {data && <h4>{data.item.title}</h4>} */}
      <h4>{data.item.title}</h4>
      <Replies />
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

// 댓글 목록 조회 페이지 -> FetchOnRender 컴포넌트 아래에 삽입
function Replies() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchReplies().then((res) => {
      setData(res.data);
    }); // axios 는 promise 객체를 반환, then 을 사용해서 콜백함수로 promise 실행 결과를 사용할 수 있음
    // Promise 객체 찾아보기
  }, []);

  if (!data) {
    return <div>댓글 로딩중</div>;
  }

  // 서버로부터 받아온 데이터 배열을 map 함수를 사용하여 각 배열의 항목마다 li 태그를 생성
  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchOnRender;
