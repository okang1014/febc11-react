import ji from '../../../ji.js';
import TodoItem from './TodoItem.js';

// 4. 할 일 목록 구성
function TodoList(props) {
  const list = props.itemList.map((item) => TodoItem({ item, toggleDone: props.toggleDone, deleteItem: props.deleteItem }));
  return ji.createElement('ul', { class: 'todolist' }, list);
}

export default TodoList;