import Button from "@components/Button";
// import "./App.css"; // 테일윈드를 사용하기 때문에 제거
import Login from "./Login";

function App() {
  return (
    // 기본 css 사용 - css 파일에 스타일 지정, className 에 해당 클래스 명 지정
    <>
      <h1>Tailwind CSS 사용</h1>
      <div className="w-48 mt-2 mx-auto">
        <Button>그냥 버튼</Button>
        {/* 하위 컴포넌트에 배경색과 전경색을 props 로 전달 */}
        <Button bg="blue" color="red">
          파란 배경의 빨간 글자
        </Button>
        <Button bg="yellow" color="red">
          노란 배경의 빨간 글자
        </Button>
        <Button bg="gray" color="blue">
          회색 배경의 파란 글자
        </Button>
        <button className="btn">default</button>
        <button className="btn btn-primary">Submit</button>
        <button className="btn btn-warn">Delete</button>
      </div>

      {/* Login 컴포넌트 삽입 */}
      <Login />
    </>
  );
}

export default App;
