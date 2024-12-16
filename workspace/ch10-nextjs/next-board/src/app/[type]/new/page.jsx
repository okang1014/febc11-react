// 게시물 목록 조회 페이지

import { addPost } from "@/actions/postAction";
import Link from "next/link";

export default async function Page({ params }) {
  const { type } = await params;
  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        {/* 원래 action 은 url 로 이동 및 전달, 하지만 next.js 에서는 함수를 지정 */}
        {/* submit 이벤트가 발생하면 addPost 를 호출 */}
        <form action={addPost}>
          {/* hidden 입력 값으로 타입을 자동으로 지정 가능 */}
          {/* hidden 속성은 사용자에게 표시할 필요 없는 input 이지만 서버에는 form 으로 전송할 필요가 있는 데이터를 처리할 수 있는 방식이다. */}
          <input type="hidden" name="type" value={type} />
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
            />
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              제목은 필수입니다.
            </p>
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
            ></textarea>
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              내용은 필수입니다.
            </p>
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              등록
            </button>
            <Link
              href="/info"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              취소
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
