// 컴포넌트를 만드는 방법은 두 가지 방법이 있음
// 하나는 지금까지 해왔던 함수형 기반
// 이번에는 클래스 기반 - 잘 사용되지 않지만 숙지할 필요성은 있음
// 거의 사용하지 않음
// 하지만 life-cycle 관련 기능을 사용하기 위해서는 간혹 class 컴포넌트를 사용하기도 함
// 있다는 것만 알아라

import { Component } from "react";
import { PropTypes } from "prop-types";

// 클래스 하나가 컴포넌트 역할을 함
// Component 를 상속
// render 메소드를 통해서 JSX 를 반환하도록 한다
class ClickMe extends Component {
  // class 형 컴포넌트에서는 props 이름이 정해져 있음
  // Parent 에서부터 props(level) 을 받아와야함
  // state/setState 는 부모(Component class)에 정의되어 있는 이름
  // 함수형 컴포넌트에서는 state 값을 여러개 지정 가능(useState 훅)
  // 상태는 state 변수 하나만 사용 가능, 따라서 여러 개의 상태를 관리하려면 객체로 지정해야함
  // state = { count: 0 }; // {state: 0, count: 0} 이런 식으로 객체를 넘겨주어야함

  constructor(props) {
    //부모 클래스의 생성자를 통해 this가 초기화되므로
    //super()를 호출해야 자식 클래스에서 this를 사용할 수 있다.
    //super(props)를 호출해야 자식 클래스에서 this.props를 사용할 수 있다.
    super(props); // constructor 을 사용하는 경우에 props 를 매개변수로 전달하는 Super 를 필수로 먼저 호출해야 this 접근 가능
    this.state = { count: props.level || 1 };
  }

  // 화살표 함수를 작성해야 this.state 등에 접근 가능
  // 화살표 함수 내의 this 는 함수가 선언된 시점의 context 를 지칭 (이 경우는 ClickMe class 내부의 state 와 count 지칭)
  handleClick = () => {
    // level props 값이 지정되지 않은 경우, undefined, 따라서 count 에는 1 이 기본으로 더해짐
    this.setState({ count: this.state.count + (this.props.level || 1) });
  }; // class 컴포넌트이기 때문에 이벤트 핸들러 함수도 바로 메소드로 추가 가능

  // 이벤트 핸들러 함수를 일반 선언식 및 표현식으로 작성하는 경우 this 는 함수가 실행되는 시점의 context 지칭
  // window 전체에서 state 와 count 를 찾기 때문에 undefined 값을 반환

  render() {
    return (
      <div>
        클릭 횟수 X {this.props.level || 1} : {this.state.count}
        <button onClick={this.handleClick}>클릭</button>
      </div>
    );
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
        <h1>01 클래스 컴포넌트</h1>
        {/* Parent 는 ClickMe 를 자식 컴포넌트로 가짐 */}
        <ClickMe level={2} />
        <ClickMe level={5} />
        <ClickMe />
        {/* level 이라는 props 를 전달 */}
      </div>
    );
  }
}

export default Parent;
