import ji from '../../../ji.js';

// 1. 헤더 구성
function Header() {
  return (
    ji.createElement('header', null,
      ji.createElement('h1', null, 'Todo List - 컴포넌트 모듈화 :)'),
      ji.createElement('p', null, '파일 경로: ',
        ji.createElement('span', { id: 'filepath' }, `ch${document.URL.split('/ch')[1]}index.html`)))
  )
}

export default Header;