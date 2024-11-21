import Shipping from "./Shipping";
import Product2 from "./Product2";
import { useCallback, useMemo, useState } from "react";

function App() {
  // API 서버로부터 조회해온 결과라고 가정
  // App 이 렌더링될 때마다 새로운 객체가 생성되기 때문에 해당 객체를 사용하는 함수가 반복해서 실행됨
  // 따라서 객체를 캐시 -> 객체를 반환하는 함수를 만들고, 해당 함수를 캐시
  const data = useMemo(
    () => ({
      _id: 2,
      price: 125000,
      shippingFees: 3000,
      name: "나이키 잼",
      quantity: 35, // 판매 가능한 수량
      buyQuantity: 10, // 현재 판매된 수량
      mainImage: "/files/00-nike/NIKE_JAM_01.jpg",
      content:
        "나이키가 세계적인 무대에 오르는 브레이크 댄서를 위해 제작한 첫 신발인 잼과 함께 몸과 마음, 정신을 하나로 만들어 보세요. 신발의 모든 디테일을 꼼꼼히 제작했기 때문에 자신 있게 사이퍼에 도전할 수 있습니다. 유연하고 내구성이 뛰어난 갑피가 몸을 따라 움직이며, 중창의 텍스처 처리된 핸드 그립 덕분에 공중에서 신발을 쉽게 잡을 수 있습니다. 그리고 위아래가 뒤집힌 로고를 배치해 프리즈 동작을 할 때 로고가 똑바로 보이는 재미를 더했죠.",
    }),
    []
  );

  // useState 를 통해서 해결할 수도 있음
  // const [data, setData] = useState({
  //   _id: 2,
  //   price: 125000,
  //   shippingFees: 3000,
  //   name: "나이키 잼",
  //   quantity: 35, // 판매 가능한 수량
  //   buyQuantity: 10, // 현재 판매된 수량
  //   mainImage: "/files/00-nike/NIKE_JAM_01.jpg",
  //   content:
  //     "나이키가 세계적인 무대에 오르는 브레이크 댄서를 위해 제작한 첫 신발인 잼과 함께 몸과 마음, 정신을 하나로 만들어 보세요. 신발의 모든 디테일을 꼼꼼히 제작했기 때문에 자신 있게 사이퍼에 도전할 수 있습니다. 유연하고 내구성이 뛰어난 갑피가 몸을 따라 움직이며, 중창의 텍스처 처리된 핸드 그립 덕분에 공중에서 신발을 쉽게 잡을 수 있습니다. 그리고 위아래가 뒤집힌 로고를 배치해 프리즈 동작을 할 때 로고가 똑바로 보이는 재미를 더했죠.",
  // })

  const [quantity, setQuantity] = useState(1);
  const [shippingFees, setShippingFees] = useState(data.shippingFees);

  // 상품 가격 = 단가 * 수량
  const productPrice = data.price * quantity;

  // 수량이 변경됨에 따라 배송비 재계산
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    // 1~5 까지는 1, 6~10 까지는 2
    // 다섯개 단위로 배송비를 추가하는 로직
    setShippingFees(data.shippingFees * Math.ceil(newQuantity / 5));
    setQuantity(newQuantity);
  };

  // 결제 알림 메시지
  // const handlePayment = () => {
  //   alert(`상품을 결제하시겠습니까?`);
  // };

  // 함수 메모이제이션
  // 함수를 캐시에 저장
  // const handlePayment = useCallback(() => {
  //   alert(`상품을 결제하시겠습니까?`);
  // }, []);

  // 금액 + 메시지 출력
  const handlePayment = useCallback(() => {
    alert(
      `배송비 ${shippingFees.toLocaleString()}원이 추가됩니다. 상품을 결제하시겠습니까?`
    );
  }, [shippingFees]);
  // 금액이 제대로 표시되지 않은 이유는 해당 함수가 생성될 당시의 지역 변수를 참조 -> 클로저가 생성됨
  // 게다가 함수이기 때문에 첫 렌더링 시에 캐시되어 더 이상 리렌더되지 않음
  // useCallback 에서 dependencies 에 shippingFees 를 추가, shippingFees 상태값이 변경되는 경우, 다시 함수 실행

  // 상태가 변경되면 리렌더링 실행
  return (
    <>
      <h1>
        06 useCallback(함수 자체를 memoize), React.memo(컴포넌트를 memoize)
      </h1>

      {/* <Product
        name={data.name}
        price={data.price}
        mainImage={data.mainImage}
        content={data.content}
      /> */}
      <Product2 product={data} />

      <h2>수량 선택</h2>
      <div>
        가격: {data.price.toLocaleString()}원
        <br />
        수량: {/* 제어 컴포넌트로 지정 */}
        <input
          type="number"
          min="1"
          max={data.quantity - data.buyQuantity}
          // 기본 수량 1, 수량이 바뀌면 총 금액이 변경
          value={quantity}
          onChange={handleQuantityChange}
        />
        (배송비는 5개당 {data.shippingFees}원씩 추가됩니다.)
        <br />
        상품 금액: {productPrice.toLocaleString()}원
      </div>

      {/* 결제 관련 이벤트 함수 prop 으로 하위 컴포넌트에 전달 */}
      <Shipping handlePayment={handlePayment} fees={shippingFees} />
    </>
  );
}

export default App;
