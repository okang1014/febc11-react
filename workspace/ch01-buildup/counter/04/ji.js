const ji = {
  // 지정한 속성과 자식 노드를 가지는 요소 노드 생성, 반환하는 메서드
  // <button type="button" onclick="handleUp()">+</button>
  // createElement('button', {type: 'button', onclick: 'handleUp()'}, '+');

  // 세번째 매개변수는 배열을 전달, rest 파라미터 사용
  createElement: (tag, props, ...children) => {
    // 요소 노드 생성

    const elem = document.createElement(tag);
    // 속성 추가
    if (props) { // 속성이 있는 경우
      // for in - 객체 내의 프로퍼티 개수만큼 반복문 실행
      // for of - 배열 내의 값만큼 반복문 실행
      for (const attrName in props) {
        elem.setAttribute(attrName, props[attrName]);
        // 대괄호 접근법을 사용하면, 변수에 대입된 '속성'에 접근하게 됨.
        // . 접근법을 하면 있는 그대로 attrName 프로퍼티를 찾게됨. 하지만 해당 프로퍼티는 없기 때문에 undefined
      }
    }

    // 자식 노드 추가
    // 3번째 인자 값은 문자열일 수도 있고, 일반 태그일 수도 있음.
    for (let child of children) {
      if (typeof child === 'string' || typeof child === 'number') {
        child = document.createTextNode(child);
      }
      elem.appendChild(child);
    }

    return elem;
  },

  // 루트노드를 관리하는 객체를 생상해서 반환
  // createRoot(document.getElementById('root')).render(App);
  createRoot: (rootNode) => {
    return {
      // 루트노드 하위에 지정한 함수를 실행해서 받은 컴포넌트를 렌더링하는 함수
      render(appFn) {
        rootNode.appendChild(appFn());
      }
    };
  }
};

export default ji;