import Shipping from "./Shipping";
import Product from "./Product";
import { useCallback, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import useAxiosInstance from "../hooks/useAxiosInstance";

function App() {
  console.log("App component render");
  // dummy data - useMemo 를 사용하여 객체를 저장, 서버로부터 데이터를 받기 때문에 더미 데이터 불필요
  // const data = useMemo(
  //   () => ({
  //     _id: 2,
  //     price: 125000,
  //     shippingFees: 3000,
  //     name: "나이키 잼",
  //     quantity: 35, // 판매 가능한 수량
  //     buyQuantity: 10, // 현재 판매된 수량
  //     mainImage: "/files/00-nike/NIKE_JAM_01.jpg",
  //     content:
  //       "나이키가 세계적인 무대에 오르는 브레이크 댄서를 위해 제작한 첫 신발인 잼과 함께 몸과 마음, 정신을 하나로 만들어 보세요. 신발의 모든 디테일을 꼼꼼히 제작했기 때문에 자신 있게 사이퍼에 도전할 수 있습니다. 유연하고 내구성이 뛰어난 갑피가 몸을 따라 움직이며, 중창의 텍스처 처리된 핸드 그립 덕분에 공중에서 신발을 쉽게 잡을 수 있습니다. 그리고 위아래가 뒤집힌 로고를 배치해 프리즈 동작을 할 때 로고가 똑바로 보이는 재미를 더했죠.",
  //   }),
  //   []
  // );

  // data 를 받아올 때 화면을 리렌더링
  const [data, setData] = useState();
  // 로딩중 상태 지정, 화면에 로딩중 화면 표시
  const [isLoading, setIsLoading] = useState(false);
  // 에러 상태, 초기 상태는 에러 없음
  const [error, setError] = useState(null);

  // useAxiosInstance custom hook 을 사용한 버전
  const axios = useAxiosInstance();

  // data 를 불러오는 로직
  const fetchData = async (_id) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/products/${_id}`);
      // params config 객체 추가하여 instance 에 전달
      // params 에 객체가 있다면 instance interceptor 에서 지정한 params 보다 우선

      // interceptor 에 의해 별도로 콘솔에서 확인 가능
      // console.log("res", res);

      // 서버 응답 정상
      setData(res.data.item); // data 상태가 API 서버로부터 받아온 값으로 변경, 화면 리렌더링
      setError(null); // 서버 로딩 완료 시 에러와 데이터가 동시에 화면에 표시되는 경우가 존재, error 상태 초기화
    } catch (err) {
      // network 자체의 에러
      // axios 는 4xx, 5xx 에러도 자동으로 catch block 실행
      // console.error(err); // interceptor 에 의해 별도로 콘솔에서 확인 가능
      setError({ message: "잠시 후 다시 요청하셔유~" });
      setData(null);
    } finally {
      // 성공, 실패 경우 모두 isLoading 상태를 false 로 변경
      setIsLoading(false);
    }
  };

  // 서버로부터 데이터를 받아오는 경우, 데이터에 따라 실행 결과가 달라짐, side effect 가 발생
  // 함수의 순수성을 유지하기 위해 useEffect 로 사용
  useEffect(() => {
    fetchData(6);
  }, []);
  // 마운트 이후 최초 한 번만 실행

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

  const handlePayment = useCallback(() => {
    alert(
      `배송비 ${shippingFees.toLocaleString()}원이 추가됩니다. 상품을 결제하시겠습니까?`
    );
  }, [shippingFees]);

  return (
    <>
      <h1>Ch09 Ajax - 02 Axios 사용 Nike 상품 상세 조회</h1>
      {/* {isLoading && <p>Loading in process</p>} */}
      {isLoading && <PulseLoader />}
      {/* 에러 발생 시 화면에 메시지 출력 */}
      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>{error.message}</p>
      )}
      {/* 최초 로딩 시 data 는 undefined, 이 경우 빈 화면을 출력
      마운트된 이후에 서버로부터 데이터를 받아오고, 불러온 데이터를 가지고 상태값을 변경, 상태값이 변경된 경우 컴포넌트 리렌더링, 해당 데이터가 포함된 화면을 리렌더링 */}
      {data && (
        <div>
          <Product product={data} />

          <h2>수량 선택</h2>
          <div>
            가격: {data.price.toLocaleString()}원
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
            {/* data 를 받아온 이후, 단가 * 개수를 계산하여 총 금액 화면에 출력 */}
            상품 금액: {(data.price * quantity).toLocaleString()}원
          </div>
          <Shipping handlePayment={handlePayment} fees={shippingFees} />
        </div>
      )}
    </>
  );
}

export default App;
