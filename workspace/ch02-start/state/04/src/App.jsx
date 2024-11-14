import { useState } from "react";
import EditAddress from "./components/EditAddress";

// 주소 수정하는 화면 구성
function App() {
  const [user, setUser] = useState({
    _id: 4,
    email: "u1@market.com",
    name: "데이지",
    phone: "01044445555",
    address: "서울시 강남구 논현동 222",
    type: "user",
    createdAt: "2024.01.25 21:08:14",
    updatedAt: "2024.02.04 09:38:14",
    extra: {
      birthday: "11-30",
      membershipClass: "MC02",
      addressBook: [
        {
          id: 1,
          name: "회사",
          value: "서울시 강동구 천호동 123",
        },
        {
          id: 2,
          name: "집",
          value: "서울시 강동구 성내동 234",
        },
      ],
    },
  });

  const handleAddressChange = (event) => {
    // 상태의 불변성이 지켜지지 않음 - 얕은 복사만 진행되고, 깊은 복사는 불가
    // const address = user.extra.addressBook.find(
    //   // address.id 와 event.target.name 의 값이 동일한 경우를 찾아라
    //   (address) => address.id === Number(event.target.name)
    // );
    // address.value = event.target.value;
    // const newState = { ...user };
    // newState 라는 user 객체의 정보를 담고 있는 새로운 객체 생성
    // setUser(user);
    // setter 함수를 사용해도 동일한 객체이기 때문에 리렌더링되지 않음(상태변경 X)

    // 상태의 불변성을 지키기 위한 추가 작업이 필요
    const newAddressBook = user.extra.addressBook.map((address) => {
      if (address.id === Number(event.target.name)) {
        return { ...address, value: event.target.value };
        // 변경한 주소록 값을 꺼내서, 변경된 객체만 찾아서 value 를 수정
        // 수정된 부분에 대해서만 수정한 새로운 객체 반환
      } else {
        return address;
        // 변경된 것이 없으면 원본 객체 그대로 반환
      }
    });

    const newState = {
      // user 를 그대로 복사, extra 는 새로운 값으로 대체
      ...user,
      extra: {
        ...user.extra,
        // 기존의 user.extra 정보를 그대로 복사
        addressBook: newAddressBook,
        // 수정된 주소를 포함한 newAddressBook 으로 교체
      },
    };

    // 디버깅용 코드 - 객체 비교 코드(user vs newState)
    // 회사 주소 변경 시, 기존 상태의 user 정보와 newState 의 정보가 달라야 함
    console.log("user", user === newState); // false
    console.log("user.extra", user.extra === newState.extra); // false
    console.log(
      "user.extra.addressBook",
      user.extra.addressBook === newState.extra.addressBook
    );
    console.log(
      "회사",
      user.extra.addressBook[0] === newState.extra.addressBook[0]
    ); // false
    console.log(
      "집",
      user.extra.addressBook[1] === newState.extra.addressBook[1]
    );
    console.log(
      "회사 주소",
      user.extra.addressBook[0].value === newState.extra.addressBook[0].value
    ); // false
    console.log(
      "집 주소",
      user.extra.addressBook[1].value === newState.extra.addressBook[1].value
    );
    console.log("기존 회사 주소", user.extra.addressBook[0].value);
    //

    setUser(newState);
    // 기존의 user 객체를 복사해서 새로운 객체로 생성, 기존 상태와 비교하여 상태 변경을 감지, 리렌더링
    // 하지만 복합 객체의 경우, 제일 바깥쪽의 객체를 복사해도 얕은 복사만 가능하고 내부 객체, 배열의 주소는 유지, 상태는 변경된 상태가 아님
    // 복합 객체의 끝단에 어떤 속성을 수정한다는 것은 결국 해당 속성의 부모 속성도 모두 새로운 객체로 수정을 해야함
    // 단순히 user 객체를 복사하면 어쨌든 리렌더링은 진행되지만, 상태의 불변성을 지키지 못하는 것
  };

  return (
    <>
      <h2>04 상태관리 대상이 복합 객체일 경우 불변성 관리</h2>
      <p>
        이메일: {user.email}
        <br />
        이름: {user.name}
        <br />
        전화번호: {user.phone}
        <br />
      </p>
      <ul>
        {/* map 메서드를 통해서 주소록을 출력 */}
        {user.extra.addressBook?.map((address) => (
          <li key={address.id}>
            {address.name}: {address.value}
          </li>
        ))}
      </ul>
      <EditAddress
        // EditAddress 컴포넌트에 props 전달
        addressBook={user.extra.addressBook} // 주소록 배열
        handleAddressChange={handleAddressChange} // 핸들러 이벤트
      />
    </>
  );
}

export default App;
