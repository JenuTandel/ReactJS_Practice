import { useState } from "react";
import "./App.css";
import { CopyToClipboard } from "./copy/CopyToClipboard";

function App() {
  const [img, setImg] = useState(null);
  const copy = CopyToClipboard;
  copy(img);
  const handleChange = (event) => {
    setImg(event.target.files[0]);
  };
  const copyHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form>
        <input type="file" onChange={handleChange} />
        <button onClick={copyHandler}>Copy</button>
      </form>
      {/* <CopyToClipboard imageData={img}></CopyToClipboard> */}
    </>
  );
}

export default App;
