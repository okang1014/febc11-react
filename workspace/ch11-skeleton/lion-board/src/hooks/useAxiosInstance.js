import axios from "axios";

function useAxiosInstance() {
  const instance = axios.create({
    baseURL: 'https://11.fesp.shop',
    timeout: 1000 * 15,
    headers: {
      'client-id': '00-brunch',
      'Content-Type': 'application/json',
      accept: 'application/json',
    }
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE3LCJ0eXBlIjoidXNlciIsIm5hbWUiOiLrr7jsmrTrp5DslpHtjIwiLCJlbWFpbCI6InVnbHlvbmlvbkBnbWFpbC5jb20iLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTczMzcyNjA3OSwiZXhwIjoxNzMzODEyNDc5LCJpc3MiOiJGRVNQIn0.bY-9zfHA0UCEFUYVBg4TFRwyzu8QlNVWm5OHsskNM4w`
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
