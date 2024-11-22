import { PacmanLoader } from "react-spinners";
import useFetch from "../hooks/useFetch";
import useAxios from "../hooks/useAxios";

function App() {
  // useFetch 버전
  // const { data, error, isLoading } = useFetch({ url: "/todolist?delay=2000" });
  // useAxios 버전
  const { data, error, isLoading } = useAxios({ url: "/todolist?delay=500" });

  return (
    <>
      <h1>09 Custom Hook - useFetch, useAxios 커스텀 훅 사용</h1>
      <h2>할 일 목록</h2>
      {/* 서버 응답이 지연되는 경우 안내 메시지 출력, React-spinner 사용하여 로딩 아이콘이 출력되도록 함*/}
      {isLoading && <PacmanLoader color="aqua" />}
      {/* error 발생 시 화면 출력 */}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {/* data 가 있는 경우 ul 요소 반환 및 데이터 출력 */}
      {data && (
        <ul>
          {data.items.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
