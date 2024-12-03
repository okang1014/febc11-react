import axios from "axios";

// axios 인스턴스를 생성하는 훅 
function useAxiosInstance() {
  // axios 인스턴스 생성
  const instance = axios.create({
    baseURL: 'https://11.fesp.shop',
    timeout: 5000,
    headers: {
      // content-type, accept 는 생략 가능, default 는 JSON
      'Content-Type': 'application/json', // requeset 데이터 타입
      accept: 'application/json', // response 데이터 타입
      'client-id': '00-nike',
    }
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    // 요청이 전달되기 전에 필요한 공통 작업 수행
    console.log(config);
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
    // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
    // 응답 데이터를 이용해서 필요한 공통 작업 수행
    console.log('response', response); // 서버로부터 응답을 받아서 우선적으로 확인 가능, 실제 응답을 사용하는 코드에서 로그를 작성하지 않아도 됨
    return response;
  }, (error) => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
    // 공통 에러 처리
    console.error('인터셉터', error);
    return Promise.reject(error);
  });

  return instance // 인스턴스 반환
}

export default useAxiosInstance;
