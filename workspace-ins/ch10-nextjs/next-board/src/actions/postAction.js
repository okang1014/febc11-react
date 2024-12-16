'use server';

// 게시물 추가
export async function addPost(formData){
  console.log('서버 액션', formData);
  const data = {
    type: formData.get('type'),
    title: formData.get('title'),
    content: formData.get('content'),
  };

  const res = await fetch('https://11.fesp.shop/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': '00-board',
    },
    body: JSON.stringify(data),
  });

  return res.json();
}