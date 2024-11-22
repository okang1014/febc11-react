import PropTypes from "prop-types";

// 라우터는 이와 비슷한 방식으로 작동
// Link 컴포넌트에서 a 태그 이벤트 제한, history 누적, 이벤트 함수 지정
Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

function Link({ children, to }) {
  const handleClick = (e) => {
    // 브라우저 기본 동작 제거(a 태그는 현재 페이지를 비우고, 새로운 페이지를 받아온다)
    e.preventDefault();

    // (state, title, url) 을 추가
    // pathname => href 의 값만
    // 직접 history API 에 history 추가
    window.history.pushState(null, "", e.target.pathname);
  };

  // a 태그는 기본적으로 서버에서 html 을 받아와 전체 화면이 리프레시됨
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
