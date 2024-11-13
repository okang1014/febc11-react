var itemList = [
  { no: 1, todo: '두부', done: false },
  { no: 2, todo: '계란', done: false },
  { no: 3, todo: '라면', done: false },
];

// 1. 대입 연산자
var newItemList = itemList;

// 2. 전개 연산자를 이용한 복사(얕은 복사)
var newItemList = [...itemList]; // false, true -> 배열은 서로 다른 배열이지만, itemList[i] 의 값은 동일함
// 새로운 배열이 생성되었지만, 내부의 객체는 여전히 참조값을 유지하고 있음 -> 따라서 내부의 객체 속성을 변경하면 모든 참조값도 변경됨
// 렌더링 과정에서는 오류는 없지만 React 대전제 만족 X

// 3. 객체를 속성으로 가질 경우, 깊은 복사를 위해 속성도 새로운 객체로 복사(깊은 복사) - React 의 불변성을 지키기 위함
newItemList[1] = { ...itemList[1] }; // 이는 추후에 학습

// itemList, newItemList 비교
newItemList[1].done = true;
console.log(itemList, newItemList);
console.log(itemList === newItemList);
console.log(itemList[1] === newItemList[1]);

// React 대전제 : 상태는 값이 불변하는 상태이다. 즉, 기존 상태는 변하면 안되며 완전히 새로운 상태를 만들어서 비교해야 렌더링된다