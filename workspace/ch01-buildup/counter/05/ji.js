const ji = {
  // 지정한 속성과 자식 노드를 가지는 요소 노드 생성, 반환하는 메서드
  // <button type="button" onclick="handleUp()">+</button>
  // createElement('button', {type: 'button', onclick: 'handleUp()'}, '+');

  // 세번째 매개변수는 배열을 전달, rest 파라미터 사용
  createElement: (tag, props, ...children) => {
    // 요소 노드 생성

    const elem = document.createElement(tag);
    // 속성 추가
    if (props) {
      for (const attrName in props) {
        const value = props[attrName];
        // 속성이 on 으로 시작되는 경우 -> 이벤트 리스너 추가
        if (attrName.toLowerCase().startsWith('on')) {
          // 속성을 모두 소문자로 변환, 속성에서 on 을 제거
          elem.addEventListener(attrName.toLowerCase().substring(2), value);
        } else {
          elem.setAttribute(attrName, value);
        }
      }
    }

    // 자식 노드 추가
    // 3번째 인자 값은 문자열일 수도 있고, 일반 태그일 수도 있음.
    for (let child of children) {
      if (typeof child === 'string' || typeof child === 'number') {
        child = document.createTextNode(child);
      } else if (typeof child === 'function') {
        // 자식 요소가 함수인 경우, 함수를 호출하라.
        child = child()
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