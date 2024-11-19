import { Component } from "react";
import { PropTypes } from "prop-types";

class ClickMe extends Component {
  handleClick = () => {
    // level props 값이 지정되지 않은 경우, undefined, 따라서 count 에는 1 이 기본으로 더해짐
    this.setState({ count: this.state.count + (this.props.level || 1) });
  };

  // 클래스 기반 Component 가 생성되고 업데이트되며 제거되는 life-cycle
  // 최초로 화면에 추가되는 Mount 과정
  // rerendering 되는 Update 과정
  // 화면에서 제거되는 Unmount 과정

  // 1 은 컴포넌트가 생성될 때(Mount)
  // 1-1
  constructor(props) {
    console.log("1-1 constructor 호출됨");
    super(props);
    this.state = { count: props.level || 1 };
  }

  // 2 는 컴포넌트가 update
  //1-2/2-1
  // 부모 Component 에 정의된 메소드 재정의
  static getDerivedStateFromProps(props, state) {
    console.log("1-2/2-1 getDerivedStateFromProps 호출됨");
    console.log("  props", props);
    console.log("  state", state);

    if (state.count > props.level * 5) {
      return { count: 0 }; // 새로운 값으로 state 업데이트
    }
    return null; // state 를 업데이트하지 않음 - 원래의 state 사용
  }

  // 2-2
  shouldComponentUpdate(nextProps, nextState) {
    console.log("2-2 shouldComponentUpdate 호출됨");
    console.log("현재값", this.props, this.state);
    console.log("다음값", nextProps, nextState);
    // nextProps 는 다음에 반환될 값으로 true 인 경우에는 update, false 인 경우, render 실행 X
    // return false;
    return nextState.count % 2 === 0;
  }

  // 1-3/2-3
  render() {
    console.log("1-3/2-3 render 호출됨");
    return (
      <div>
        클릭 횟수 X {this.props.level || 1} : {this.state.count}
        <button onClick={this.handleClick}>클릭</button>
      </div>
    );
  }

  // 1-4
  componentDidMount() {
    console.log("1-4 componentDidMount 호출됨");
  }

  // 2-4
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("2-4 getSnapshotBeforeUpdate 호출됨");
    return "hello";
  }

  // 2-5
  componentDidUpdate() {
    console.log("2-5 componentDidUpdate 호출됨");
  }

  // 3-1 컴포넌트가 화면에서 제거되는 과정 unmount
  componentWillUnmout() {
    console.log("3-1 componentWillUnmout 호출됨");
  }
}

ClickMe.propTypes = {
  level: PropTypes.number,
  count: PropTypes.number,
};

class Parent extends Component {
  render() {
    return (
      <div>
        <h1>03 클래스 컴포넌트 - 컴포넌트의 라이프 사이클</h1>
        <ClickMe level={1} />
      </div>
    );
  }
}

export default Parent;
