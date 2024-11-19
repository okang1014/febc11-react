import Footer from "@components/Footer";
import Header from "@components/Header";
import TodoContainer from "@pages/TodoContainer";

// App.jsx 에서는 UI 만 관리하도록
// 표현 컴포넌트

function App() {
  return (
    <div id="todo">
      <Header />
      <TodoContainer />
      <Footer />
    </div>
  );
}

export default App;
