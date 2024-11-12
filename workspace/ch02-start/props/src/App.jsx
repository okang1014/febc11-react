import Counter from "./components/Counter";
import Header from "./components/Header";

function App() {
  return (
    // React 에서는 자바스크립트 함수에서 HTML 코드를 그대로 삽입 가능
    // React 문법(JSX 문법)으로 만든 함수는 태그 형태로 사용 가능 -> <function/> 닫는 태그 필수
    <div id="app">
      <Header />
      <Counter />
    </div>
  );
}

export default App;
