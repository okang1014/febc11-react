// class 기반의 상태관리
import { makeAutoObservable } from 'mobx';

// 상태 지정, 수정하는 기능을 모두 클래스에 저장
class CounterStore {
  count = 0;

  // 클래스 내부의 생성자
  constructor() {
    makeAutoObservable(this); // 상태 관찰
  }

  // 상태를 변경하는 메서드
  countUp(step) {
    this.count += step;
  }

  countDown(step) {
    this.count -= step;
  }

  countReset() {
    this.count = 0;
  }
}

// CounterStore 클래스를 생성해서 반환하여 export
export default new CounterStore();