import Ji from '../ji.js';

function Header() {
  return (
    Ji.createElement('header', null,
      Ji.createElement('h1', null, 'Counter - 컴포넌트 모듈화'),

      Ji.createElement('p', null, '파일 경로: ',
        Ji.createElement('span', { id: 'filepath' }, `ch${document.URL.split('/ch')[1]}index.html`)))
  )
}

// 누구나 사용할 수 있도록 export
export default Header;