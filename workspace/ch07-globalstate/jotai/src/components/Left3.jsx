import { counterAtom } from "@jotai/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

function Left3() {
  const [count] = useAtom(counterAtom);

  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });
  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
