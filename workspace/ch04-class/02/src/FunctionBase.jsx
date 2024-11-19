import { useState } from "react";
import { PropTypes } from "prop-types";

// 함수형 컴포넌트 - 확실히 class 컴포넌트보다 코드가 간결하고 가독성도 높음
// 과거에는 life-cycle 관련 기능을 사용하지 못하여서 함수형 컴포넌트가 덜 사용되었지만
// 현재는 함수형 컴포넌트의 기능이 추가되었기 때문에 함수형을 대부분 사용
function ClickMe({ level }) {
  const [count, setCount] = useState(level || 1);

  const handleClick = () => {
    setCount(count + (level || 1));
  };

  return (
    <div>
      클릭 횟수 X {level || 1} : {count}
      <button onClick={handleClick}>클릭</button>
    </div>
  );
}

// class ClickMe extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: props.level || 1 };
//   }

//   handleClick = () => {
//     this.setState({ count: this.state.count + (this.props.level || 1) });
//   };

//   render() {
//     return (
//       <div>
//         클릭 횟수 X {this.props.level || 1} : {this.state.count}
//         <button onClick={this.handleClick}>클릭</button>
//       </div>
//     );
//   }
// }

ClickMe.propTypes = {
  level: PropTypes.number,
  count: PropTypes.number,
};

function Parent() {
  return (
    <div>
      <h1>02 클래스 컴포넌트 - 함수 컴포넌트와 같이 사용</h1>
      <ClickMe level={2} />
      <ClickMe level={5} />
      <ClickMe />
    </div>
  );
}

// class Parent extends Component {
//   render() {
//     return (
//       <div>
//         <h1>02 클래스 컴포넌트 - 함수 컴포넌트와 같이 사용</h1>
//         <ClickMe level={2} />
//         <ClickMe level={5} />
//         <ClickMe />
//       </div>
//     );
//   }
// }

export default Parent;
