import PropTypes from "prop-types";
import { useEffect } from "react";

Right3.propTypes = {
  countUp: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  countDown: PropTypes.func.isRequired,
};

function Right3({ countDown, reset, countUp }) {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });
  return (
    <div>
      <h3>Right3</h3>
      <button
        onClick={() => {
          countDown(1);
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          reset(1);
        }}
      >
        0
      </button>
      <button
        onClick={() => {
          countUp(1);
        }}
      >
        +1
      </button>
    </div>
  );
}

export default Right3;
