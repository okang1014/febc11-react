// pagination 을 재사용 가능한 컴포넌트화

import PropTypes from "prop-types";
import { Link, useSearchParams } from "react-router-dom";

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  current: PropTypes.number,
};

function Pagination({ totalPages, current = 1 }) {
  // pagination
  // const current = params.page; // 현재 페이지를 params 로부터 획득
  // const current = data?.pagination.page; // params 에서 현재 페이지를 획득하는 것 대신 api 로부터 받은 응답을 가지고 현재 페이지를 판단하는 것이 나을 듯
  // current 는 상위 컴포넌트로부터 전달받기 때문에 current 선언 필요 없음

  let pageList = [];

  // seachParams 훅 사용하여 현재의 query string 획득
  const [searchParams] = useSearchParams();

  // API 를 통해 page 와 현재 페이지에 보여주고자 하는 데이터 개수를 지정할 수 있음
  for (let page = 1; page <= totalPages; page++) {
    searchParams.set("page", page); // searchParams 객체에 page 만 page 로 지정
    // searchParams 객체를 문자열로 반환
    let search = searchParams.toString();

    pageList.push(
      <li className={current === page ? "active" : ""} key={page}>
        <Link to={`/list?${search}`}>{page}</Link>
      </li>
    );
  }

  return (
    <div className="pagination">
      <ul>
        {/* pageNation 기능 추가 */}
        {/* <li className="active">
            <Link to={`/list?page=1`}>1</Link>
          </li>
          <li>
            <Link to={`/list?page=2`}>2</Link>
          </li>
          <li>
            <Link to={`/list?page=3`}>3</Link>
          </li> */}
        {pageList}
      </ul>
    </div>
  );
}

export default Pagination;
