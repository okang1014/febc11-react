import ji from '../../../ji.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Todo from './Todo.js';

// 7. Application 루트 컴포넌트
function App() {
  // 샘플 목록
  // let itemList = [
  //   { no: 1, title: '두부', done: true },
  //   { no: 2, title: '계란', done: false },
  //   { no: 3, title: '라면', done: true },
  // ];

  // 상태값이 변경되면 자동으로 화면 리렌더링
  // 아래 코드에서 화면 렌더링 함수 삭제 처리
  const [itemList, setItemList] = ji.useState([
    { no: 1, title: '두부', done: true },
    { no: 2, title: '계란', done: false },
    { no: 3, title: '라면', done: true },
  ]);

  // "추가" 클릭 이벤트 핸들러
  const handleAdd = () => {
    const inputElem = document.querySelector('.todoinput > input');
    if (inputElem.value.trim() !== '') {
      addItem(inputElem.value);
      inputElem.value = '';
      inputElem.focus();
    }
  };

  // 엔터 이벤트 핸들러
  const handleAddKeyup = (event) => {
    if (event.key === 'Enter') handleAdd();
  };

  // 할일 추가
  function addItem(title) {
    const item = {
      no: itemList[itemList.length - 1].no + 1,
      title,
      done: false,
    };

    // TODO: 데이터 갱신
    const newItemList = [...itemList, item];
    // 동일한 항목을 가지고 있지만 새로운 배열을 생성
    // 값은 동일하지만 itemList 와 다른 주소를 가리키고 있게 만듦

    // itemList.push(item);
    // 참조형 데이터는 동일한 객체, 배열이 저장된 메모리 주소를 가리키고 있기 때문에, 객체 및 배열의 데이터가 변경되어도 동일한 객체, 배열을 가리키게 됨.
    // 따라서 새로운 배열로 만들어야 함.
    setItemList(newItemList);
  }

  // 완료/미완료 처리
  function toggleDone(no) {
    // TODO: 데이터 갱신
    const newItemList = [...itemList];

    let selectedItem = newItemList.find(item => item.no === no);
    selectedItem.done = !selectedItem.done;

    setItemList(newItemList);
  }

  // 할일 삭제
  function deleteItem(no) {
    // TODO: 데이터 갱신
    // filter 는 원본 배열을 수정하는 것이 아닌, 원본은 유지된채 필터된 결과를 새로운 배열로 반환. 따라서 복사해서 사용할 필요가 없음
    const newItemList = itemList.filter(item => item.no !== no);
    // splice 를 사용하는 경우, 원본 배열을 수정하는 것이기 때문에 데이터를 복사한 새로운 배열을 만들어야함
    setItemList(newItemList);
  }
  return ji.createElement('div', { id: 'todo' }, Header, Todo({ handleAdd, handleAddKeyup, itemList, toggleDone, deleteItem }), Footer);
}

export default App;