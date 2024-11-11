import Ji from '../ji.js';

// counter 컴포넌트 내에는 up, down, reset 기능도 포함
function Counter() {
  const [count, setCount] = Ji.useState(10);
  // useState 함수를 호출하면 배열을 반환

  // 목적 - 데이터가 변경되면 자동으로 화면이 갱신되도록 만들기
  const handleDown = () => {
    setCount(count - 1);
  };
  const handleUp = () => {
    setCount(count + 1);
  };
  const handleReset = event => {
    setCount(0);
  };

  return (
    Ji.createElement('div', { id: 'counter' },
      Ji.createElement('button', { type: 'button', onclick: handleDown }, '-'),
      Ji.createElement('button', { type: 'button', onclick: (event) => handleReset(event) }, 0),
      Ji.createElement('button', { type: 'button', onclick: handleUp }, '+'),
      Ji.createElement('span', { style: 'margin-left: 10px' }, count))
  )
}

export default Counter;