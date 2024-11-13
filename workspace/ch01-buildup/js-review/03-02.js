var item = { no: 1, todo: '두부', done: true };

// 1. 대입 연산자로 newItem 생성
var newItem = item;

// 2. Object.assign() 사용해서 속성을 추가
// Object.assign(target, ...source): target 객체에 source 객체들의 속성을 추가
var newItem = Object.assign(item, { delete: true }); // 기존의 객체에 새로운 속성 추가, return 값은 target 반환
// 결국 item 객체와 동일한 객체인데 이제 다른 속성을 곁들인... 그래서 item === newItem

var newItem = Object.assign({}, item); // target 객체를 빈 객체로 만들면 새로운 객체 생성
// 새로운 객체를 만들고, 객체 내부에 item 과 다른 프로퍼티 추가. 따라서 item !== newItem

// 3. item 의 속성으로 새로운 객체를 생성
var newItem = { no: item.no, done: item.done, todo: item.todo }; // item 의 속성을 동일하게 갖는 완전히 새로운 객체를 생성

// 4. 전개 연산자를 이용한 복사 ES6
var newItem = { ...item }; // 3과 같은 방식으로 동작하는 코드
var newItem = { ...item, done: false }; // 동일한 속성키를 갖는 속성의 값을 변경할 수 있음
// React 의 state 로 상태를 관리했지만, 새로운 객체(또는 배열)로 만들어야 상태 변화가 감지됨

// item, newItem 비교
newItem.done = false;
console.log(item, newItem);
console.log('같은 객체인가?', item === newItem);
// 두 변수는 객체가 저장된 동일한 메모리 주소를 참조하고 있음
// 따라서 두 변수에 해당하는 객체 값을 변경하는 경우, 동일한 메모리 주소를 참조하고 있기 때문에, 해당 메모리 주소에 저장된 데이터를 수정