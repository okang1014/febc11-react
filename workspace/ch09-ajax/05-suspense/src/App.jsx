// Replies 컴포넌트는 default export 가 아니라 named export 로 import
import { Suspense } from "react";
import FetchAsYouRender, { Replies } from "./03-FetchAsYouRender";
import PostList from "./PostList";

function App() {
  return (
    <>
      <h1>04 Data Fetching Pattern - Fetch-as-you-render</h1>
      <Suspense fallback={<div>Post list loading in progress</div>}>
        <PostList />

        <Suspense fallback={<div>Post detail loading in progress</div>}>
          <FetchAsYouRender />

          <Suspense fallback={<div>Replies loading in progress</div>}>
            <Replies />
          </Suspense>
        </Suspense>
      </Suspense>
    </>
  );
}

export default App;
