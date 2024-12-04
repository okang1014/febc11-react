import PropTypes from "prop-types";
import { memo } from "react";

// React.memo 를 사용하여 product 컴포넌트 memoize
// memoization ver.
const Product = memo(function Product({
  product: { name, price, mainImages, content },
}) {
  // regular ver.
  // function Product({ name, price, mainImage, content }) {
  console.log("Product Render");

  return (
    <>
      <h2>상품 설명</h2>
      <p>상품명: {name}</p>
      <p>가격: {price.toLocaleString()}원</p>
      <p>상품 설명</p>
      <div>
        {mainImages && (
          <img src={`https://11.fesp.shop${mainImages[0].path}`} width="600" />
        )}
        <p>{content}</p>
      </div>
    </>
  );
  // memoization ver.
});
// regular ver.
// }

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    mainImages: PropTypes.array,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
