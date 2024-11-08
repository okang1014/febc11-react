
// 즉시 실행 함수로 변경. 예상치 못한 접근으로 인해 이상이 생기는 것을 방지하기 위해 스코프를 제한
const ji = (() => {
  // ji 함수 내부에서만 사용하는 변수 선언
  // 함수 밖에 선언하면 전역변수가 됨, 라이브러리 내의 함수들만 접근할 수 있도록 범위 축소

  let _root;
  let _stateValue;
  // _ 로 시작하는 변수는 private 한(외부에서 접근하지 않도록) 변수, 암묵적인 룰이자 컨벤션

  // 함수 내부에 함수를 선언하는 것이기 때문에 함수 표현식 형태로 변경
  const createElement = (tag, props, ...children) => {

    // 요소 노드 생성
    const elem = document.createElement(tag);

    // 속성 추가
    if (props) {
      for (const attrName in props) {
        const value = props[attrName];
        if (attrName.toLowerCase().startsWith('on')) {
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
        child = child()
      } else if (Array.isArray(child)) {
        // child 가 배열인 경우
        child.forEach(c => elem.appendChild(c));
      }

      if (!Array.isArray(child)) elem.appendChild(child);
    }

    return elem;
  };

  const createRoot = (rootNode) => {
    let _appComponent; // 앱의 루트 컴포넌트, 선언 시에는 undefined

    return _root = {
      render(appFn) {
        // _appComponent 가 null || undefined 면 appFn 를 실행
        _appComponent = _appComponent || appFn;
        if (rootNode.firstChild) {
          rootNode.firstChild.remove();
          // 만일 rootNode 에 자식 노드가 있다면 자식 노드를 비우는 코드
        }
        rootNode.appendChild(_appComponent());
      }
    };
  };

  // 상태값 관리 함수
  // let [count, setCount] = Ji.useState(10); 초기값만 전달하면 배열을 반환
  // 리액트를 흉내내는 함수, 라이브러리의 작동 원리를 이해하는 것이 중요
  const useState = (initValue) => {
    // 변수가 최초로 선언된 상태, 값이 없는 상태
    // 최초 한 번만 initValue 로 정의하는 과정
    if (_stateValue === undefined) {
      // 최초 useState 를 호출될 때 한 번만 실행
      _stateValue = initValue;
    }

    // setValue(11)
    function setValue(newValue) {
      const oldValue = _stateValue; // 10
      _stateValue = newValue; // 11

      // is == 두 값 일치 여부를 판단하는 메서드
      // 두 값을 비교, 같지 않은 경우에(상태가 변경된 경우) 리렌더링
      if (!Object.is(oldValue, newValue)) {
        _root.render();
        // 새로운 값을 기준으로 새로운 화면 렌더링
      }
    }

    // 현재 상태값, 상태값을 변환하는 함수를 배열로 반환
    return [_stateValue, setValue];
  }

  // 위의 함수 세 개를 객체로 리턴
  return { createElement, createRoot, useState };
})();

export default ji;