import PropTypes from "prop-types";
import { memo } from "react";

// 상태가 변경되면 리렌더링 실행
// 수량이 변경될 때 굳이 상세페이지가 렌더링될 필요는 없음
// 변하지 않는 요소가 렌더링되는 것은 불필요한 성능 저하를 일으킬 수 있음 - 더군다나 커포넌트에 로직이 복잡한 경우 더더욱 성능이 저하될 수 있음
// 컴포넌트 메모이제이션은 이미 렌더링된 자식 요소를 메모이제이션, 따라서 Product 는 따로 리렌더링되지 않음

// memoization ver.
const Product = memo(function Product({ name, price, mainImage, content }) {
  // regular ver.
  // function Product({ name, price, mainImage, content }) {
  console.log("Product Render");

  return (
    <>
      <h2>상품 설명</h2>
      <p>상품명: {name}</p>
      <p>가격: {price.toLocaleString()}</p>
      <p>상품 설명</p>
      <div>
        <img src={`https://11.fesp.shop${mainImage}`} width="600" />
        <p>{content}</p>
      </div>
    </>
  );
  // memoization ver.
});
// regular ver.
// }

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  mainImage: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Product;
