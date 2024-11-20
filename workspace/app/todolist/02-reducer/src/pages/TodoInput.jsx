import PropTypes from "prop-types";
import { useRef, useState } from "react";

function TodoInput({ addItem }) {
  const [title, setTitle] = useState("");

  // 이벤트 실행이 완료되고 포커스를 주기 위해 DOM Node 에 직접 접근해야함
  const titleElem = useRef(null); // {current: null} 객체 반환

  const handleAdd = () => {
    if (title.trim() !== "") {
      // const item = { _id: nextId, title, done: false };
      // title 만 전달하도록 지정
      addItem(title);
      setTitle("");
    }

    // 이벤트 완료 시 input 에 포커스가 가도록
    titleElem.current.focus();
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") handleAdd();
  };

  return (
    <div className="todoinput">
      <input
        type="text"
        autoFocus // 최초 로딩 시에만 focus 되는 것
        onKeyUp={handleKeyUp}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        // ref 속성 추가
        ref={titleElem}
      />
      <button type="button" onClick={handleAdd}>
        추가
      </button>
    </div>
  );
}

TodoInput.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default TodoInput;
