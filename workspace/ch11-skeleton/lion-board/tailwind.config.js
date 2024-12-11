/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // 사용자가 다크모드 지정할 수 있도록 설정, default 는 media(사용자 환경 설정에 따름)
  darkMode: 'selector',
}

