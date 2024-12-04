import axios from "axios";

// axios 인스턴스를 생성하는 훅 
function useAxiosInstance() {
  // axios 인스턴스 생성
  const instance = axios.create({
    baseURL: 'https://todo-api.fesp.shop/api',
    timeout: 1000 * 15,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    }
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    // config 객체에 params 객체에 delay 값이 있는 경우 실행
    config.params = {
      delay: 2000, // params 객체 내부에 있는 delay 값을 2000 으로 수정
      ...config.params, // 기존의 params 쿼리스트링 복사
    }
    // interceptor 에서 지정한 config 를 사용
    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {

    console.error('인터셉터', error);

    return Promise.reject(error);
  });

  return instance // 인스턴스 반환
}

export default useAxiosInstance;
