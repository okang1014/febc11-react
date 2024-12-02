// jotai atom
import { atom } from 'jotai';

// 초기값 상태값 0 으로 지정
export const counterAtom = atom(0);

// recoil 에서는 atom 에 대한 식별자가 필요, 하지만 jotai 에서는 불필요
// export const counterState = atom({
//   key: 'count', // atom 을 식별하는 식별자, 모든 atom 에서 고유한 이름
//   default: 8, // 기초 상태값
// });