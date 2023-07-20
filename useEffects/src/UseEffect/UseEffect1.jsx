import React, { useState, useEffect } from "react";

export const UseEffect1 = () => {
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   // console.log("useEffects");
  //   if (count >= 1) {
  //     document.title = `Chat ${count}`;
  //   } else {
  //     document.title = `Chat`;
  //   }
  // });
  console.log("Hello");
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
};
