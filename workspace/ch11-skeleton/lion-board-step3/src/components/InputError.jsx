// 상위 컴포넌트로부터 target 을 전달받고, target(에러메시지)가 없는 경우 return,
// target 이 있는 경우, message 출력

import PropTypes from "prop-types";

InputError.propTypes = {
  target: PropTypes.object,
};

export default function InputError({ target }) {
  if (!target) return;
  // title 의 에러 메시지가 있는 경우 출력, 없는 경우, undefined 로 출력 X,
  // handleSubmit 함수가 입력값 검증 후 에러 추가, 에러 상태 변경
  return (
    <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
      {target?.message}
    </p>
  );
}
