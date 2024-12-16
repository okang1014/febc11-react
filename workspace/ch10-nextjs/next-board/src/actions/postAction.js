'use server'; // 서버 액션에 추가해야 하는 필수 지시자
// 서버 액션을 정의하는 컴포넌트에는 use server 를 명시적으로 지정
// 서버 컴포넌트는 서버에서만 실행되는 컴포넌트
// 클라이언트 컴포넌트는 클라이언트에만 실행되는 컴포넌트

// 게시글 추가 기능
export async function addPost(formData) {
  console.log('서버 액션', formData);

  // API 에 전송할 데이터
  const data = {
    type: formData.get('type'),
    title: formData.get('title'),
    content: formData.get('content'),
  };
  // 사용자가 입력한 폼데이터에서 서버 요청 데이터를 추출

  const res = await fetch('https://11.fesp.shop/posts', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'client-id': '00-board',
    },
    body: JSON.stringify(data), // 객체 데이터를 json 형태로 직렬화
  });

  return res.json();
};