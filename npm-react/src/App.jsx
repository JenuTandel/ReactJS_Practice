import React, { useState } from "react";
import "./App.css";
import { UseToggler } from "use-toggler/UseToggler";
import CopyToClipboard from "./copy/CopyToClipboard";

function App() {
  const [isOn, setIsOn] = UseToggler(true);
  const [img, setImg] = useState(null);

  const handleChange = (event) => {
    setImg(event.target.files[0]);
  };
  const copyHandler = (e) => {
    e.preventDefault();
    CopyToClipboard(img);
  };
  return (
    <>
      <button
        onClick={() => {
          setIsOn((isOn) => !isOn);
        }}
      >
        is Active {`${isOn}`}
      </button>
      <form>
        <input type="file" onChange={handleChange} />
        <button onClick={copyHandler}>Copy</button>
      </form>
      {/* <CopyToClipboard imageData={img}></CopyToClipboard> */}
    </>
  );
}

export default App;
