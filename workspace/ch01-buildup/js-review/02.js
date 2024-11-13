var itemList = [
  { no: 1, todo: '두부', done: true },
  { no: 2, todo: '계란', done: false },
  { no: 3, todo: '라면', done: true },
];

console.log(itemList[0]);
console.log(itemList[1]);

// itemList 의 구조를 분해해서 배열 내의 직접 변수에 할당받을 수 있음
var [first, second, third] = itemList; // [index[0], index[1], index[2]]
// React 에서 useState() 에서 많이 사용하는 형식

console.log(first);
console.log(second);
console.log(third);

// var state = useState(0);
// console.log(state[0]);
// console.log(state[1](state[0] + 1));

// var [state, setState] = useState(0);
// console.log(state);
// console.log(setState(state + 1));

console.log(second.no);
console.log(second.todo);

// second 객체의 프로퍼티를 새로운 객체의 변수에 담을 수 있음
// 객체의 키, 
var { no, todo, done } = second;
console.log(no, todo, done);

// 구조 분해 할당 시 선언된 변수 대신 다른 변수를 사용하고 싶을 때 변수명을 변경할 수 있음
// 예 : no 를 다른 곳에서 사용 중인 경우, no: number 형식으로 변수명을 변경할 수 있음 - var {no: number, todo, done} = second;

function App(props) {

}

function App({ no, todo, done }) {

}

// 객체에 존재하지 않는 변수를 사용하는 경우 undefined 가 반환

// 객체를 구조 분해 할당하는 경우, 순서 상관 없이 속성 이름을 변수로 사용
// 배열을 구조 분해 할당하는 경우, 순서에 맞춰서 할당. 배열은 index 가 즉 key 이기 때문
