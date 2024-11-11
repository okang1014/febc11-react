import ji from '../../../ji.js';

// 3. 할 일 아이템 하나 구성
function TodoItem({ item, toggleDone, deleteItem }) {
  // {item} : 구조 분해 할당
  // 넘어오는 객체 내부의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JS 표현식
  return (
    ji.createElement('li', { 'data-no': item.no },
      ji.createElement('span', null, item.no),
      ji.createElement('span', { onclick: () => toggleDone(item.no) },
        item.done ? ji.createElement('s', null, item.title) : item.title),
      ji.createElement('button', { onclick: () => deleteItem(item.no) }, '삭제'))
  );
}

export default TodoItem;