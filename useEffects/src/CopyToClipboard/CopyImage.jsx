import React, { useState, useRef } from "react";
export const CopyImage = () => {
  const [imgsrc, setImgsrc] = useState(null);
  const mydivRef = useRef(null);
  async function loadBlob(fileName) {
    const fetched = await fetch(fileName);
    return await fetched.blob();
  }
  const fileHandler = (event) => {
    console.log(event.target.files[0]);
    getBase64(event.target.files[0]);
  };
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        setImgsrc(baseURL);
        console.log(typeof baseURL);
        resolve(baseURL);
      };
    });
  };
  const copyHandler = () => {
    const divContent = mydivRef.current.innerText;
    // console.log(divContent);
    const url = "../src/assets/mine.png";
    const blobInput = loadBlob(url);
    const clipboardItems = [
      new ClipboardItem({
        "image/png": blobInput,
      }),
      new ClipboardItem({
        "text/plain": new Blob([divContent], { type: "text/plain" }),
      }),
    ];
    navigator.clipboard.write(clipboardItems);
  };
  return (
    <div>
      <input type="file" onChange={fileHandler}></input>
      <div ref={mydivRef}>
        <p>Display React Logo</p>
        <p>React</p>
      </div>
      <button id="copy" onClick={copyHandler}>
        Copy
      </button>
      <button id="paste">Paste</button>
    </div>
  );
};
