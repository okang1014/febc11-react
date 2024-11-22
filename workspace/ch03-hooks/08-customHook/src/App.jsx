import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

const API_SERVER = "https://todo-api.fesp.shop/api";

function App() {
  // 서버로부터 받은 데이터를 data 로 상태 관리
  const [data, setData] = useState(null);
  // error 메시지 발생 시 리렌더링, 화면에 표시하도록
  const [error, setError] = useState(null);
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // fetch API 를 사용해서 Todo API 서버에 요청 전송, 데이터를 받아오는 함수
  const fetchTodo = async (fetchParams) => {
    try {
      setIsLoading(true); // 로딩 상태 변경, 처음 요청을 보냈을 시, 로딩 상태 true 로 변경
      // 실행 결과 값 Promise 객체 반환 - async await 를 사용하는 것이 좋음
      const res = await fetch(API_SERVER + fetchParams.url);
      console.log(res);

      const jsonData = await res.json(); // 서버에서 JSON 을 반환, json() 메서드도 Promise 객체 반환
      console.log(jsonData);

      if (jsonData.ok) {
        setData(jsonData.items);
        setError(null); // data 가 있는 경우, error 는 null 로 초기화
      } else {
        throw new Error(jsonData.error.message);
      }
    } catch (err) {
      // 에러 처리
      console.error(err); // console 에 에러 메시지 출력
      // 서버 응답에 실패가 있는경우(정상적인 요청 x + 서버측에 문제)
      setError({
        message:
          "일시적인 문제로 인해 작업 처리에 실패했습니다. 잠시 후 다시 요청해 주시기 바랍니다.",
      });
      // 500 오류는 두루뭉술하게, 그 외 사용자 입력 문제는 명시적으로
      setData(null); // 에러가 있는 경우, data 는 null 로 초기화
    } finally {
      // 서버 데이터 응답 받기 성공 또는 실패 이후, 실행 코드
      setIsLoading(false);
      // try 아예 밑에 setIsLoading 상태 변경이 가능, 하지만 try...catch...finally 가 세트이기에 가독성 측면 및 직관성 측면에서 조금 더 좋다
    }
  };

  // 외부 서버로부터 데이터를 가져오는 코드같은 경우는 side effect 를 일으킴
  // 따라서 해당 함수는 useEffect 내부에서 사용
  // 빈 배열을 dependency 에 전달하는 경우, 마운트되는 단계에서만 setup 함수 실행
  useEffect(() => {
    const fetchParams = { url: "/todolist?delay=3000" }; // api url 에는 특정 시간 이후 응답을 받게 할 수 있음 delay 속성
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
      {/* 서버 응답이 지연되는 경우 안내 메시지 출력, React-spinner 사용하여 로딩 아이콘이 출력되도록 함*/}
      {isLoading && <PacmanLoader color="aqua" />}
      {/* error 발생 시 화면 출력 */}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
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
