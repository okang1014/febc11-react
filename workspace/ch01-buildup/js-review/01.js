var arr = [10, 20, 30];

// 각 요소의 제곱값으로 구성된 새로운 배열 생성
var arr2 = [100, 400, 900];

// for
var arr2 = [];
for (let i = 0; i < arr.length; i++) {
  arr2.push(arr[i] * arr[i]);
}

// for of ES6
var arr2 = [];
for (let item of arr) {
  // arr 배열 내의 item 개수만큼 반복
  // item 은 arr 배열 내의 항목
  arr2.push(item * item);
}


// Array.prototype.forEach(), ES5
var arr2 = [];
// forEach() 내부에는 콜백 함수 정의
// 배열 내부의 항목 개수만큼 반복
arr.forEach(function (item, i) {
  arr2.push(item * item);
});
// 첫번째 매개변수 값으로 배열 내의 항목 전달, 두번째 매개변수는 항목의 index 값
// 사용되지 않는 매개변수는 생략 가능
// forEach() 는 지정한 콜백 함수를 실행하지만 return 하는 값은 없다

// Array.prototype.map(), ES6
// map() 은 내부적으로 함수 실행 결과 값을 새로운 배열에 담아서 return 함
// 새로운 배열 생성이나 새로운 배열로 푸시하지 않아도 자동으로 결과값을 담은 새로운 배열을 반환
arr.map(function (item, i) {
  return (item * item);
});

// Arrow function, ES6
var arr2 = [];
// 화살표 함수는 function 키워드 생략, 대신 매개변수와 함수 body를 => 로 연결
arr.forEach((item, i) => {
  arr2.push(item * item);
});

// 매개변수 하나인 경우는 괄호 생략 가능
// 함수 body 의 코드가 한 줄인 경우에는 중괄호를 생략할 수 있음
// 중괄호가 생략된 경우는 자동으로 return 한다는 의미를 갖고 있기 때문에 return 키워드 생략 가능
arr.map(item => item * item)

console.log(arr2);  // [100, 400, 900]