import React from "react";
import "./App.css";
import { UseEffect1 } from "./useEffect/useEffect1";
import { UseEffect2 } from "./UseEffect/UseEffect2";
import { UseReducer1 } from "./UseReducer/UseReducer1";
import { UseReducer2 } from "./UseReducer/UseReducer2";
import { CopyToClipboard } from "./CopyToClipboard/CopyToClipboard";
import { CopyImageToClipboard } from "./CopyToClipboard/CopyImageToClipboard";

function App() {
  return (
    <>
      {/* <UseEffect1></UseEffect1> */}
      {/* <UseReducer1></UseReducer1> */}
      {/* <UseReducer2></UseReducer2> */}
      {/* <CopyToClipboard></CopyToClipboard> */}
      <CopyImageToClipboard></CopyImageToClipboard>
    </>
  );
}

export default App;
