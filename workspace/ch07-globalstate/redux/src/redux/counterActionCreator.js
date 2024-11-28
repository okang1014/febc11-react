export const COUNTER_ACTION = {
  UP: 'countUp',
  DOWN: 'countDown',
  RESET: 'countReset'
};

// actionCreator 는 action 을 생성해서 반환하는 역할
// counterActionCreator.countUp(2) 호출 시 action 객체가 반환됨
// action 객체는 {type: 'countUp', payload: {step: 2}} type 은 해야할 동작, payload 는 사용될 데이터를 포함한 객체
const counterActionCreator = {
  countUp: (step) => ({ type: COUNTER_ACTION.UP, payload: { step } }),
  countReset: () => ({ type: COUNTER_ACTION.RESET }), // reset 은 0 으로 초기화이기 때문에 payload 가 필요 없음
  countDown: (step) => ({ type: COUNTER_ACTION.DOWN, payload: { step } }),
};

export default counterActionCreator;