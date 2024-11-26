import axios from "axios";

// axios 인스턴스를 생성하는 훅 
function useAxiosInstance() {
  // axios 인스턴스 생성
  const instance = axios.create({
    baseURL: 'https://todo-api.fesp.shop/api',
    timeout: 1500,
    headers: {
      // content-type, accept 는 생략 가능, default 는 JSON
      'Content-Type': 'application/json', // requeset 데이터 타입
      accept: 'application/json', // response 데이터 타입
    }
  });

  return instance // 인스턴스 반환
}

export default useAxiosInstance;
