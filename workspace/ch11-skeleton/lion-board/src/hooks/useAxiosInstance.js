import useUserStore from "@zustand/userStore";
import axios from "axios";

function useAxiosInstance() {
  const { user } = useUserStore();
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
      // 회원가입이 된 상태
      config.headers['Authorization'] = `Bearer ${user.accessToken}`;
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
  }, (error) => {

    console.error('인터셉터', error);

    return Promise.reject(error);
  });

  return instance // 인스턴스 반환
}

export default useAxiosInstance;
