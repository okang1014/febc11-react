import { Fragment } from "react";

export default function EditAddress({ addressBook, handleAddressChange }) {
  const list = addressBook.map((address) => {
    return (
      // Fragment 약어(<>)는 속성 지정 불가
      // 따라서 Fragment 직접 입력해야 함
      <Fragment key={address.id}>
        {/* for 대신 htmlFor 속성 사용, JS 에 for 예약어가 있기 때문 */}
        <label htmlFor={address.id}>{address.name} </label>
        {/* 사용자의 데이터를 받기 위한 input */}
        <input
          id={address.id}
          type="text"
          name={address.id}
          // input 을 받는다면 handle 이벤트도 같이 등록해주어야 함ㄴ
          value={address.value}
          onChange={handleAddressChange}
        />
        <br />
      </Fragment>
    );
  });

  return list;
}
