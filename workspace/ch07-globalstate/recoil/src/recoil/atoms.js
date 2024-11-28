import { atom } from "recoil";

// 하나의 atom 은 하나의 상태값을 담당
export const counterState = atom({
  key: 'count', // atom 을 식별하는 식별자, 모든 atom 에서 고유한 이름
  default: 8, // 기초 상태값
});