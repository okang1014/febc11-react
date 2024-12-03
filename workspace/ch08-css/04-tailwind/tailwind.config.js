/** @type {import('tailwindcss').Config} */
export default {
  // TailwindCSS 적용할 파일을 content 에 지정
  // src 폴더 밑의 모든 폴더에 있는 파일 중 js 또는 jsx 파일만
  // 타입스크립트인경우 ts, tsx 로 지정
  content: ["./src/**/*.{js,jsx}"], // 띄어쓰기하면 인식이 안됨
  theme: {
    extend: {},
  },
  plugins: [],
}

// /** @type {import('tailwindcss').Config} */
// export default {

//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


// /** @type {import('tailwindcss').Config} */
// module.exports = {
  
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }