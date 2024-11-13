// utility 성 함수를 외부에 export

export function plus(x, y) {
  return x + y;
}

export function minus(x, y) {
  return x - y;
}

function multiple(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function sum(kor, eng, math) {
  return kor + eng + math;
}

// kor, eng, math 는 매개변수
export function avg(kor, eng, math) {
  return sum(kor, eng, math) / 3;
}

// default export
export default { plus, minus, multiple, divide, sum, avg };
// 기능을 객체로 묶어서 전송하게 되면 함수를 사용하는 쪽에서 객체명.함수명() 형식으로 사용 가능