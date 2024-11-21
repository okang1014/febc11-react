import Counter from "@components/Counter";
import Header from "@components/Header";

function App() {
  return (
    <div id="app">
      <Header />
      <Counter>5</Counter>
      {/* Counter 컴포넌트에 children 을 전달 가능  */}
    </div>
  );
}

export default App;
