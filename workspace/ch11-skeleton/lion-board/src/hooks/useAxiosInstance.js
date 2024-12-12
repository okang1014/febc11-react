import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// access token 재발급 URL
const REFRESH_URL = '/auth/refresh';

function useAxiosInstance() {
  const { user, setUser } = useUserStore();

  const navigate = useNavigate();
  const location = useLocation();

  const instance = axios.create({
    baseURL: 'https://11.fesp.shop',
    timeout: 1000 * 15,
    headers: {
      'client-id': '00-board',
      'Content-Type': 'application/json',
      accept: 'application/json',
    }
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    if (user) {
      // let token = user.accessToken;

      // 수정 1.
      // 로그인한 상태 + 서버요청이 refreshToken 요청이 아닌 경우,
      if (user && config.url !== REFRESH_URL) {
        // config headers 에 기존의 액세스 토큰으로 수정
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }

      // refresh 요청일 경우 Authorization 헤더는 이미 refresh token으로 지정되어 있음
      // 만일 config 객체의 요청 URL 이 refresh 요청 URL 인 경우
      // if (config.url === REFRESH_URL) {
      // access token 을 refresh 요청 결과값으로 받는 access token 으로 교체
      // token = user.refreshToken;
      // }

      // 회원가입이 된 상태
      // config.headers['Authorization'] = `Bearer ${token}`;
      // access token 은 만료 기한이 짧다 - 탈취, 그리고 이로 인한 오남용을 막기 위해 기한을 일부러 짧게 설정, 서버 측에서도 관리하지 않음
      // 반면 refresh token 은 만료 기한이 길고, 서버 측에서도 관리, access token 으로 인한 문제가 발생하면 refresh token 으로 갱신함으로써 해결 가능
    }
    // config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjc4LCJ0eXBlIjoidXNlciIsIm5hbWUiOiLqsJXsp4Dtm4giLCJlbWFpbCI6ImppaG9vbkB0ZXN0LmNvbSIsImltYWdlIjp7Im9yaWdpbmFsbmFtZSI6ImVmYzU4MWMwYzA4MmQxN2IuanBnIiwibmFtZSI6IkUwcWZhQk4zRC5qcGciLCJwYXRoIjoiL2ZpbGVzLzAwLWJydW5jaC9FMHFmYUJOM0QuanBnIn0sImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzMzODA1ODkyLCJleHAiOjE3MzM4OTIyOTIsImlzcyI6IkZFU1AifQ.bA1QWEIqnZL3I27cdvy91lyEn9ukEZTFWVmIl8UvAeM`
    config.params = {
      delay: 500,
      ...config.params,
    }
    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use((response) => {
    return response;
  }, async (error) => { // 수정 2
    // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
    // 공통 에러 처리
    console.error('인터셉터', error);
    const { config, response } = error;

    if (response?.status === 401) { // 인증 실패
      if (config.url === REFRESH_URL) { // refresh token 만료 시 다시 로그인 화면으로 이동
        navigateLogin();
      } else if (user) { // 로그인 했으나 access token 만료된 경우
        // refresh 토큰으로 access 토큰 재발급 요청
        const { data: { accessToken } } = await instance.get(REFRESH_URL, {
          headers: {
            Authorization: `Bearer ${user.refreshToken}`
          }
        });
        // user 객체 복사, 그리고 재발급된 accessToken 값을 헤더에 추가
        setUser({ ...user, accessToken });
        config.headers.Authorization = `Bearer ${accessToken}`;
        // 갱신된 accessToken으로 재요청
        return axios(config);
      } else { // 로그인 안한 경우(accessToken 도 없고, refresh token 만료 문제도 아닌 경우)
        navigateLogin(); // 로그인 화면으로 이동
      }
    }
    return Promise.reject(error);
  });

  // async (error) => {
  //   // 에러가 발생했을 경우
  //   console.error('인터셉터', error);

  //   const { config, response } = error;

  //   // 서버로부터 응답(에러)이 있고, 해당 상태 코드가 401(인증 실패 오류) 인 경우
  //   if (response?.status === 401) {
  //     if (config.url === REFRESH_URL) { // refresh token 만료
  //       const gotoLogin = confirm('로그인 후에 이용 가능합니다. \n로그인 페이지로 이동하시겠습니까?');
  //       gotoLogin && navigate('/users/login', { state: { from: location.pathname } });
  //       // 원래 가려던 페이지를 state 로 지정 가능

  //     } else { // access token 이 만료 || 로그인하지 않아 access token 이 없음

  //       // refresh token 으로 access token 재발급 요청
  //       const accessToken = await getAccessToken(instance);
  //       if (accessToken) {

  //         // 갱신된 access token 으로 요청 다시 전송
  //         config.headers.Authorization = `Bearer ${accessToken}`; // headers 에 새롭게 받은 access token 을 세팅
  //         return axios(config);
  //       }
  //     }
  //   } else {
  //     // 인증 실패 오류 외 에러 처리
  //     return Promise.reject(error);
  //   }

  // });

  // access token 재발급 함수
  // async function getAccessToken(instance) {
  //   try {
  //     // data 는 서버 응답 데이터
  //     const { data: { accessToken } } = await instance.get(REFRESH_URL);
  //     setUser({ ...user, accessToken }); // 기존의 사용자 상태 복사 후 새롭게 받아온 accessToken 으로 수정
  //     return accessToken;
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  function navigateLogin() {
    const gotoLogin = confirm('로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?');
    // confirm 창에서 확인 누른 경우, 로그인으로 이동, 이동하고자 했던 pathname 을 from 속성으로 추가
    // state 는 location 객체에 state 객체 > from 이라는 속성으로 추가
    gotoLogin && navigate('/users/login', { state: { from: location.pathname } });
  }

  return instance // 인스턴스 반환
}

export default useAxiosInstance;
