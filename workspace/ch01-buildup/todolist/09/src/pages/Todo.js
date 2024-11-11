import ji from '../../../ji.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

// 5. 할 일 구성
// itemList 객체를 props 매개변수로 전달
function Todo(props) {
  return (
    ji.createElement('div', { id: 'main' },
      ji.createElement('div', { id: 'container' },
        ji.createElement('ul', null,
          ji.createElement('li', null,
            ji.createElement('h2', null, '쇼핑 목록'),
            TodoInput({ handleAdd: props.handleAdd, handleAddKeyup: props.handleAddKeyup }),
            TodoList({ itemList: props.itemList, toggleDone: props.toggleDone, deleteItem: props.deleteItem })))))
  )
}

export default Todo;