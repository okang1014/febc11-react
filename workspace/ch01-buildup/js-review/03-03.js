var score = [100, 90, 80];

// 1. 전개 연산자 사용하여 새로운 배열 생성
var newScore = [...score]; // 필요에 따라 , 뒤에 새로운 데이터 추가 가능

console.log(score, newScore);
console.log(score === newScore);
