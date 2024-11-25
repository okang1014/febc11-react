import { RouterProvider } from "react-router-dom";
// import router from "./routes";
import router from "./routes-lazy";
import { Suspense } from "react";
import { PulseLoader } from "react-spinners";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Suspense fallback={<PulseLoader />}> */}
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Suspense>
  );
}

export default App;
