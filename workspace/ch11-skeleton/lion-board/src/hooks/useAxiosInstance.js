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
