import axios from "axios";
import { Slide, toast } from "react-toastify"; // toast 출력 함수, slide, zoom 등 transition 효과도 import 필요

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

    const message = '잠시 후 다시 요청하세요.';

    // 에러처리 방법 1. 에러 메시지를 공통으로 사용하고, 화면에 출력
    // error.message = message; // 에러 객체에 message 추가
    // 하지만 상황에 따른 메시지를 사용할 수 없고, 모든 페이지의 에러 메시지가 동일

    // 에러처리 방법 2. 얼럿으로 지정
    // alert(message);
    // 얼럿창을 출력하게 된다면 모든 브라우저 작동이 멈춰서 UX 적으로 바람직하지 않음

    // 에러처리 방법 3. 토스트 메시지
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide, // transition 은 react-toast 로부터 import 해야함
      // toast 함수로 토스트 메시지 유형(에러, 경고 등)을 지정할 수 있고, toast 함수의 두 번째 인자로 스타일 객체를 전달할 수 있음
    }); // toast 함수에 메시지를 전달하여 토스트 메시지 출력

    return Promise.reject(error);
  });

  return instance // 인스턴스 반환
}

export default useAxiosInstance;
