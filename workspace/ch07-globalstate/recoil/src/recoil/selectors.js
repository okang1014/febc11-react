import { counterState } from "@recoil/atoms";
import { selector } from "recoil";

// selector 는 atom 의 기초 상태값을 가공해서 반환
export const counterStateKor = selector({
  key: 'korCount', // atom 을 식별하는 식별자, 모든 atom 에서 고유한 이름

  // get 함수를 통해서 한 번 가공된 결과값을 반환
  get: ({ get }) => { // get 함수는 atom 이 가지고 있는 기초 값을 꺼내올 수 있는 함수
    const count = get(counterState);
    // return count * count;
    return numberToKorean(count); // 추출한 atom 값을 기반으로 파생된 값을 반환
  },
});

// 숫자를 한글로 변환하는 함수
function numberToKorean(number) {
  const koreanNumbers = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const koreanUnits = ['', '십', '백', '천'];

  const result = [];
  let idx = 0;
  let hasNonZero = false; // 0 이외의 숫자가 있는지 체크하기 위한 변수

  while (number > 0) {
    const digit = number % 10;
    const unit = koreanUnits[idx % 4];

    if (digit !== 0) {
      if (digit === 1 && unit !== '') { // 단위가 있고, 현재 자리수가 1인 경우에는 '일'을 생략
        result.unshift(unit);
      } else {
        result.unshift(koreanNumbers[digit] + unit);
      }
      hasNonZero = true; // 0 이외의 숫자가 있는 것을 표시
    } else if (hasNonZero && result[0] !== '백') { // 0 이외의 숫자가 있는 경우에만 일의 자리를 처리하고, '백'일 경우에는 생략
      result.unshift('영');
    }

    number = Math.floor(number / 10);
    idx++;
  }

  return result.join('');
}