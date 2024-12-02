// Template Literal 복습

function sayHello(strings, ...values) {
  // console.log(strings);
  // console.log(values);

  // 내 코드
  let wordArray = [];
  for (let i = 0; i < strings.length; i++) {
    // wordArray.push(strings[i]);
    // wordArray.push(values[i] ? `<strong>${values[i]}</strong>` : null);
    wordArray.push(strings[i], values[i] ? `<strong>${values[i]}</strong>` : null);
  }
  return wordArray.join('');

  // 강사님 코드
  // let result = '';
  // for (let i = 0; i < strings.length; i++) {
  //   const value = values[i] ? values[i] : '';
  //   result += strings[i] + `<strong>${value}</strong>`;
  // }
  // return result;
}

// sayHello (평문 문자 배열, 강조 문자 배열) 
// => '안녕하세요, 지훈님. 오늘 날씨는 맑음 입니다.'
const result = sayHello(['안녕하세요, ', '님. 오늘 날씨는 ', '입니다.'], '지훈', '맑음');
// => '안녕하세요, <strong>지훈</strong>님. 오늘 날씨는 <strong>맑음</strong> 입니다.'
console.log(result);

const result2 = sayHello(['안녕하세요. ', '님. 오늘 날씨는 ', ' 입니다. 즐거운 ', ' 보내세요.'], '데이지', '흐림', '하루');
// => 안녕하세요. <strong>데이지</strong>님. 오늘 날씨는 <strong>흐림</strong> 입니다. 즐거운 <strong>하루</strong> 보내세요.
console.log(result2);

const userName = '지훈';
const weather = '맑음';

const str = `안녕하세요, ${userName}님. 오늘 날씨는 ${weather} 입니다.`;

const result3 = sayHello(['안녕하세요, ', '님. 오늘 날씨는 ', '입니다.'], userName, weather);

// const result4 = sayHello(str, userName, weather);
const result4 = sayHello`안녕하세요, ${userName}님. 오늘 날씨는 ${weather} 입니다.`
// 태그드 템플릿 리터럴 문법 - 고급 템플릿 리터럴 사용 문법, 문자열을 그대로 전달하되, 문자열은 템플릿 리터럴 기준으로 배열 생성
// 함수 뒤에 템플릿 문자열을 전달하면, 템플릿 리터럴을 제외한 부분은 문자열의 배열이 인자로 전달
console.log(result4)