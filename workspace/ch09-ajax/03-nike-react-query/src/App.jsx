import Shipping from "./Shipping";
import Product from "./Product";
import { useCallback, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery } from "@tanstack/react-query";

function App() {
  // useAxiosInstance custom hook 을 사용한 버전
  const axios = useAxiosInstance();

  // data 를 받아올 때 화면을 리렌더링
  // const [data, setData] = useState();
  // 로딩중 상태 지정, 화면에 로딩중 화면 표시
  // const [isLoading, setIsLoading] = useState(false);
  // 에러 상태, 초기 상태는 에러 없음
  // const [error, setError] = useState(null);

  // data 를 불러오는 로직
  // const fetchData = async (_id) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get(`/products/${_id}`);
  //     // 서버 응답 정상
  //     setData(res.data.item); // data 상태가 API 서버로부터 받아온 값으로 변경, 화면 리렌더링
  //     setError(null); // 서버 로딩 완료 시 에러와 데이터가 동시에 화면에 표시되는 경우가 존재, error 상태 초기화
  //   } catch (err) {
  //     setError(err);
  //     setData(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(6);
  // }, []);

  // 상품 상세 조회
  // react-query 라이브러리를 가지고 API 서버 요청
  // useQuery 실행 결과는 객체를 반환, data 와 isLoading, error 를 포함
  // 컴포넌트가 로딩되는 순간 자동으로 호출
  const { data, isLoading, error, refetch } = useQuery({
    // refetch 함수는 해당 useQuery 를 다시 호출해주는 함수
    queryKey: ["products", 7], // queryKey 는 캐시할 key 값, 주로 서버 주소를 캐시(7번 상품)
    queryFn: () => axios.get(`/products/${7}`), // 서버에 Ajax 요청을 보내는 코드 작성, Promise 를 반환
    select: (res) => res.data.item, // queryFn 실행 결과(axios 호출 결과)로 변환된 값 중 특정 속성을 추출하여, 필요한 속성만 사용
    // refetchInterval: 1000*3 // 3초 간격으로 refetch, 실시간으로 서버의 데이터를 클라이언트 동기화 가능,폴링 기능
  });
  // 내부적으로는 ch03/09 custom hook 의 useFetch, useAxios 와 비슷하게 작동, 내부적으로 data, isLoading, error 상태 관리
  // 탭 전환 또는 화면 전환 시 자동으로 해당 함수 실행 가능

  // 상품 구매
  // useMutations 훅은 데이터 등록, 수정, 삭제 시 사용되는 훅
  // 훅 실행 결과로 반환된 함수는 이벤트 핸들러 내에서 사용할 수 있음
  const orderProduct = useMutation({
    // queryKey: ["products", 7], // 상품 구매 시 쿼리 키 캐싱 불필요
    mutationFn: (products) => axios.post(`/orders`, products),
    // 실제 호출되게 하려면 useMutation 가 반환한 orderProducts 객체 내의 mutate 라는 함수 호출하면 mutationFn 실행
    onSuccess: () => {
      // 주문 성공 시 실행 작업
      toast.success("구매를 완료하였습니다.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      refetch(); // 주문 성공 시 useQuery 의 refetch() 함수 호출 -> 전체 화면 새로고침
    },
    onError: (err) => {
      // toast.error(err.message); // Axios Interceptor 에서 지정한 에러로 대체
      console.log(err);
    },
  });

  console.log("isLoading", isLoading);
  console.log("error", error);
  console.log("data", data);

  // 기본 배송료 하드코딩
  const basicShippingFee = 3000;

  const [quantity, setQuantity] = useState(1);
  const [shippingFees, setShippingFees] = useState(basicShippingFee);

  // 수량이 변경됨에 따라 배송비 재계산
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setShippingFees(basicShippingFee * Math.ceil(newQuantity / 5));
    setQuantity(newQuantity);
  };

  const handlePayment = () => {
    // useCallback(() => {
    const ok = confirm(
      `배송비 ${shippingFees.toLocaleString()}원이 추가됩니다. 상품을 결제하시겠습니까?`
    );

    if (ok) {
      // useMutation 훅이 반환한 orderProduct 객체 내부의 mutationFn() 을 호출하게 됨
      // 매개변수로 전달한 값은 products 객체로 body 에 추가되어 요청 전송
      orderProduct.mutate({
        products: [{ _id: 7, quantity }],
        // 배송비와 별개로 수량 상태는 계속 변경되어야 함
      });
    }
  };
  // , [/*shippingFees*/, quantity]); // shippingFees 는 quantity 에 영향을 받음, 개수가 변경되면 결국 리렌더링, 함수 캐싱이 의미 없음

  return (
    <>
      <h1>Ch09 Ajax - 03 React Query 사용 Nike 상품 상세 조회</h1>
      {isLoading && <PulseLoader />}
      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>{error.message}</p>
      )}
      {data && (
        <div>
          <Product product={data} />

          <h2>수량 선택</h2>
          <div>
            가격: {data.price.toLocaleString()}원
            <br />
            남은 수량: {data.quantity - data.buyQuantity}
            <br />
            수량:
            <input
              type="number"
              min="1"
              max={data.quantity - data.buyQuantity}
              value={quantity}
              onChange={handleQuantityChange}
            />
            (배송비는 5개당 {basicShippingFee.toLocaleString()}원씩 추가됩니다.)
            <br />
            상품 금액: {(data.price * quantity).toLocaleString()}원
          </div>
          <Shipping handlePayment={handlePayment} fees={shippingFees} />
        </div>
      )}
      <ToastContainer
      // position="top-center"
      // autoClose={2000}
      // hideProgressBar={false}
      // newestOnTop={false}
      // closeOnClick
      // rtl={false}
      // pauseOnFocusLoss
      // draggable
      // pauseOnHover
      // theme="light"
      // transition={Slide}
      />
    </>
  );
}

export default App;
