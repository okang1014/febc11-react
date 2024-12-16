// 동적 라우팅 설정 시, 해당 폴더를 [동적 라우팅 명(변수명)] 으로 지정하면 Next.js 에 의해 자동으로 라우팅 설정
// 자료 구조가 결국 라우팅 경로가 됨, 따라서 더더욱 자료 구조 관리가 중요

import Link from "next/link";

// react-router-dom 에서는 useParams 로 해당 url 중 list 의 type 을 획득하여, 해당 리스트를 동적으로 페이지에 출력
// next.js 에서는 params 라는 prop 으로 자동으로 전달되어 사용 가능
// React 에서는 컴포넌트를 async 함수로 사용할 수 없음
// 하지만 Next.js 에서는(서버 컴포넌트 한정) async 함수로 사용할 수 있음
export default async function Page({ params }) {
  // const { type } = params; // params 객체 내의 type 을 구조 분해 할당, next.js 14 까지는 props 를 바로 사용할 수 있었음
  // Next.js 15 에서는 params 가 Promise 로 전달됨, 따라서 promise 가 fulfilled 되는 것을 기다려야 함.
  const { type } = await params;

  // react 에서는 const {type} = useParams(); 로 해당 게시판의 type 을 url 로부터 전달받음

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          {type} 게시판
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        <form action="#">
          <input
            className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
            type="text"
            name="keyword"
          />
          <button
            type="submit"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          >
            검색
          </button>
        </form>

        <Link
          href="/info/new"
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        >
          글작성
        </Link>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
              <td className="p-2 text-center">2</td>
              <td className="p-2 truncate indent-4">
                <Link href="/info/2" className="cursor-pointer">
                  안녕하세요.
                </Link>
              </td>
              <td className="p-2 text-center truncate">용쌤</td>
              <td className="p-2 text-center hidden sm:table-cell">29</td>
              <td className="p-2 text-center hidden sm:table-cell">2</td>
              <td className="p-2 truncate text-center hidden sm:table-cell">
                2024.07.05 13:39:23
              </td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
              <td className="p-2 text-center">1</td>
              <td className="p-2 truncate indent-4">
                <Link href="/info/1" className="cursor-pointer">
                  좋은 소식이 있습니다.
                </Link>
              </td>
              <td className="p-2 text-center truncate">제이지</td>
              <td className="p-2 text-center hidden sm:table-cell">22</td>
              <td className="p-2 text-center hidden sm:table-cell">5</td>
              <td className="p-2 truncate text-center hidden sm:table-cell">
                2024.07.03 17:59:13
              </td>
            </tr>
          </tbody>
        </table>
        <hr />

        <div>
          <ul className="flex justify-center gap-3 m-4">
            <li className="font-bold text-blue-700">
              <Link href="/info?page=1">1</Link>
            </li>
            <li>
              <Link href="/info?page=2">2</Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
