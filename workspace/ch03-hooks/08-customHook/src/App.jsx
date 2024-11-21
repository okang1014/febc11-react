import { useEffect, useState } from "react";

const API_SERVER = "https://todo-api.fesp.shop/api";

function App() {
  // 서버로부터 받은 데이터를 data 로 상태 관리
  const [data, setData] = useState();

  // fetch API 를 사용해서 Todo API 서버에 요청 전송, 데이터를 받아오는 함수
  const fetchTodo = async (fetchParams) => {
    try {
      // 실행 결과 값 Promise 객체 반환 - async await 를 사용하는 것이 좋음
      const res = await fetch(API_SERVER + fetchParams.url);
      console.log(res);

      const jsonData = await res.json(); // 서버에서 JSON 을 반환, json() 메서드도 Promise 객체 반환
      console.log(jsonData);

      if (jsonData.ok) {
        setData(jsonData.items);
      } else {
        throw new Error(jsonData.error.message);
      }
    } catch (err) {
      // 에러 처리
      console.error(err); // console 에 에러 메시지 출력
    }
  };

  // 외부 서버로부터 데이터를 가져오는 코드같은 경우는 side effect 를 일으킴
  // 따라서 해당 함수는 useEffect 내부에서 사용
  // 빈 배열을 dependency 에 전달하는 경우, 마운트되는 단계에서만 setup 함수 실행
  useEffect(() => {
    const fetchParams = { url: "/todolist" };
    fetchTodo(fetchParams);
  }, []);

  // 최초로 마운트 될 때 렌더링이 일어남
  // 그리고 useEffect 내부에서 실행한 함수가 실행되고
  // data 를 불러오고 state 가 변경
  // 리렌더링
  return (
    <>
      <h1>08 Custom Hook - fetch API 사용(커스텀 훅 미사용)</h1>
      <h2>할 일 목록</h2>
      {/* data 가 있는 경우 ul 요소 반환 및 데이터 출력 */}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
