import React, { useRef, useState } from "react";
import logo from "./../assets/logo.png";
import clipboardCopy from "clipboard-copy";

export const CopyImageToClipboard = () => {
  const canvasRef = useRef(null);
  const mydivRef = useRef(null);

  const [imgUrl, setImgUrl] = useState("");
  const [text, setText] = useState("");

  const handleCopyClick = () => {
    const divContent = mydivRef.current.innerText;

    const imgElement = document.getElementById("logo");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match the image
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    // Draw the image on the canvas
    ctx.drawImage(imgElement, 0, 0);

    // Convert canvas content to a data URL
    setImgUrl(canvas.toDataURL("image/png"));
    console.log(imgUrl);
    setText(divContent);

    // Copy the data URL to the clipboard
    navigator.clipboard.writeText(imgUrl).then(() => {
      console.log("Image copied to clipboard!");
    });
    // navigator.clipboard.write(imgUrl).then(() => {
    //   console.log("Copied");
    // });
    clipboardCopy(imgUrl).then(() => {});
  };

  const handlePasteClick = () => {
    console.log(imgUrl);
    showImage(imgUrl);
    showText(text);
  };
  const showImage = (dataURL) => {
    const img = document.createElement("img");
    img.src = dataURL;
    // img.alt = "Pasted Image";
    img.style.maxWidth = "none";
    img.style.maxHeight = "none";
    img.style.objectFit = "cover";

    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = ""; // Clear the container before adding the new image
    imageContainer.appendChild(img);
  };
  const showText = (mytext) => {
    const textContainer = document.getElementById("mydiv");
    textContainer.innerText = mytext;
  };
  return (
    <div>
      <div ref={mydivRef}>
        <p>Display React Logo</p>
        <p>React</p>
      </div>
      <div>
        <img
          id="logo"
          src={logo}
          alt="React Logo"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <button onClick={handleCopyClick}>Copy Image to Clipboard</button>
      <button onClick={handlePasteClick}>Paste Image to Clipboard</button>
      <div id="mydiv"></div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div id="image-container"></div>
    </div>
  );
};
