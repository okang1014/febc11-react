// react 에서는 상위 컴포넌트, 하위 컴포넌트를 지정해서 추가해야함
// next.js 는 파일명을 기준으로 상, 하위 컴포넌트 파악, 하위 컴포넌트를 상위 컴포넌트에 추가
// next.js 는 프레임워크이기 때문에, 프레임워크에 맞춰서 프로그래밍해야함
// 프레임워크에 맞게 프로그래밍만 한다면 자동으로 프레임워크에 의해 작동
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Next.js App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

// next.js 프레임워크를 사용하는 것은 프로그래밍 언어의 문법을 아는 것과는 다름.
// 프레임워크에서 정해진 규칙을 파악하고, 내 코드를 규칙에 맞게 작성
// next.js 는 서버사이드 렌더링을 지원
//
