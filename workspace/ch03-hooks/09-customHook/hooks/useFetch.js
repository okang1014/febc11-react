import { useEffect, useState } from "react";

const API_SERVER = "https://todo-api.fesp.shop/api";

// fetchParams 를 매개변수로 전달
// 공통의 로직들을 훅을 만들어서 사용하면 사용하기 편함(API 서버 요청 등)
function useFetch(fetchParams) {
  // 서버로부터 받은 응답 데이터를 data 로 상태 관리
  const [data, setData] = useState(null);
  // 서버로부터 받은 에러 메세지
  const [error, setError] = useState(null);
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    request(fetchParams);
  }, []); // 마운트 된 후 한 번만 호출, 업데이트 시 호출 안됨

  // API 서버에서 fetch API 로 ajax 요청 전송
  const request = async (params) => {
    try {
      setIsLoading(true); // 로딩 상태 변경, 처음 요청을 보냈을 시, 로딩 상태 true 로 변경
      // 실행 결과 값 Promise 객체 반환 - async await 를 사용하는 것이 좋음
      const res = await fetch(API_SERVER + params.url);
      console.log(res);

      const jsonData = await res.json(); // 서버에서 JSON 을 반환, json() 메서드도 Promise 객체 반환
      console.log(jsonData);

      if (jsonData.ok) {
        setData(jsonData);
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
      setData(null); // 에러가 있는 경우, data 는 null 로 초기화
    } finally {
      // 서버 데이터 응답 받기 성공 또는 실패 이후, 실행 코드
      setIsLoading(false);
      // try 아예 밑에 setIsLoading 상태 변경이 가능, 하지만 try...catch...finally 가 세트이기에 가독성 측면 및 직관성 측면에서 조금 더 좋다
    }
  };

  return { data, error, isLoading }
}

// 커스텀 훅은 일반 함수 내에서 훅을 사용 가능하다
export default useFetch;