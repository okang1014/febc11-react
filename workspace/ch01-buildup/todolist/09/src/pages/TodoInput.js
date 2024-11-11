import ji from '../../../ji.js';

// 2. 입력창 구성
function TodoInput({ handleAdd, handleAddKeyup }) {
  return (
    ji.createElement('div', { class: 'todoinput' },
      ji.createElement('input', { type: 'text', autofocus: '', onkeyup: event => handleAddKeyup(event) }),
      ji.createElement('button', { type: 'button', onclick: handleAdd }, '추가'))
  );
}

export default TodoInput;