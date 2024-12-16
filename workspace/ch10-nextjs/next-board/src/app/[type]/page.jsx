// 동적 라우팅 설정 시, 해당 폴더를 [동적 라우팅 명(변수명)] 으로 지정하면 Next.js 에 의해 자동으로 라우팅 설정
// 자료 구조가 결국 라우팅 경로가 됨, 따라서 더더욱 자료 구조 관리가 중요

import ListItem from "@/app/[type]/ListItem";
import Link from "next/link";

// 게시물 목록 조회 후 반환
async function fetchPosts(type) {
  // api 서버 주소에 type 값 전달
  const url = `https://11.fesp.shop/posts?type=${type}`;

  // Next.js 에서는 API 서버 호출은 fetch API 에 캐싱 기능이 추가됨
  const res = await fetch(url, {
    headers: { "client-id": "00-board" },
  });
  return await res.json(); // 서버 응답으로 전달받은 데이터를 parsing
}

// 게시글 리스트에 해당하는 metadata
// 별도로 absolute 를 지정하지 않았기 때문에 index 에서 지정된 템플릿에 title 추가
export const metadata = {
  title: "게시물 목록",
  description: "게시물 목록 페이지입니다.",
};

// react-router-dom 에서는 useParams 로 해당 url 중 list 의 type 을 획득하여, 해당 리스트를 동적으로 페이지에 출력
// next.js 에서는 params 라는 prop 으로 자동으로 전달되어 사용 가능
// React 에서는 컴포넌트를 async 함수로 사용할 수 없음
// 하지만 Next.js 에서는(서버 컴포넌트 한정) async 함수로 사용할 수 있음
export default async function Page({ params }) {
  // react 에서는 const {type} = useParams(); 로 해당 게시판의 type 을 url 로부터 전달받음
  // const { type } = params; // params 객체 내의 type 을 구조 분해 할당, next.js 14 까지는 props 를 바로 사용할 수 있었음
  // Next.js 15 에서는 params 가 Promise 로 전달됨, 따라서 promise 가 fulfilled 되는 것을 기다려야 함.

  // Next.js 에서는 컴포넌트를 서버 측에서 렌더링을 완료하여 화면에 반환, 따라서 React 컴폰넌트와 달리, 데이터가 없는 경우의 예외 처리가 불필요

  const { type } = await params;

  const data = await fetchPosts(type);

  console.log(data.item.length, "건 조회됨.");

  const list = data.item.map((item) => <ListItem key={item._id} item={item} />);
  // data 내부의 item 의 개수만큼 반복해서 ListItem 컴포넌트 생성, ListItem 컴포넌트에 key 를 item._id 로 지정, item 에 props 로 전달

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
          <tbody>{list}</tbody>
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
