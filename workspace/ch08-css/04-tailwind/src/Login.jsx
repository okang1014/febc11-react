import Button from "@components/Button";
// import "./Login.css"; //테일윈드를 사용하기 때문에 제거
function Login() {
  return (
    // 정확한 값을 사용하기 위해서는 [값] 이런식으로 입력해도 된다 - arbitrary value
    <div className="w-72 mt-12 mx-auto p-5 border border-gray-300 rounded-lg shadow-md text-center">
      <h2 className="mb-5 text-xl font-bold">Login</h2>
      <form className="flex flex-col">
        <div className="mb-4 text-left">
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-[10px] border border-gray-300 rounded-md text-red-500 bg-blue-500"
            required
          />
        </div>
        <div className="mb-4 text-left">
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-[10px] border border-gray-300 rounded-md text-blue-500 bg-red-500"
            required
          />
        </div>
        <Button bg="gray" color="blue">
          회원가입
        </Button>
        <Button bg="yellow" color="black">
          카카오 로그인
        </Button>
        <Button type="submit">로그인</Button>
        {/* submit 버튼으로 별도 타입 지정 */}
      </form>
    </div>
  );
}

export default Login;
