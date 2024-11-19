import { Component } from "react";
import ChildComponent from "./ClassBase";
// export default Parent 가 ChildComponent 에 할당되어 있음
// ./ 또는 ../ 이 없는 경우, npm 을 통해 사용하는 확장 패키지 지칭

class App extends Component {
  render() {
    return <ChildComponent />;
  }
}

export default App;
