// 해당 컴포넌트에서 사용되는 컴포넌트를 import 해야함.
// 함수명에 cmd + i 하면 자동 임포트됨
import Ji from '../ji.js';
import Header from './Header.js';
import Counter from './Counter.js';

// 애플리케이션 시작점
function App() {
  return (
    Ji.createElement('div', { id: 'app' }, Header, Counter)
  );
}

export default App;