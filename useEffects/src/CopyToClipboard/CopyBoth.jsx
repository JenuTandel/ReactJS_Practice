import React, { useRef, useState } from "react";

export const CopyBoth = () => {
  const nameRef = useRef(null);
  const designationRef = useRef(null);
  const contactRef = useRef(null);
  const canvasRef = useRef(null);
  const [compositeImageUrl, setCompositeImageUrl] = useState(null);

  // JavaScript code
  const generateHandler = () => {
    // Text data to be copied
    //   const textData = "Jinal Tandel Image";
    const name = nameRef.current.innerText;
    const des = designationRef.current.innerText;
    const contact = contactRef.current.innerText;
    // Image data to be copied
    const imageUrl = "../src/assets/mine.png";

    // Create an image element to hold the original image
    const image = new Image();
    image.crossOrigin = "Anonymous"; // Set this if the image is hosted on a different domain
    image.src = imageUrl;
    image.style.objectFit = "cover";

    // Wait for the image to load before copying
    image.onload = async () => {
      // Create a canvas element
      const maincanvas = canvasRef.current;
      const canvas = document.createElement("canvas");
      maincanvas.width = 400;
      maincanvas.height = image.height;
      canvas.width = image.width;
      canvas.height = image.height;

      // Get the canvas context
      const mainctx = maincanvas.getContext("2d");
      const ctx = canvas.getContext("2d");
      const radius = Math.min(image.width, image.height) / 2;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(
        image,
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2
      );
      mainctx.drawImage(canvas, 0, 0);
      // Draw the image on the canvas
      // ctx.drawImage(image, 10, 30);

      // Add the text to the canvas
      mainctx.font = "16px Sans-serif";
      mainctx.fillText(name, 120, canvas.height / 3);
      mainctx.fillText(des, 120, canvas.height / 3 + 20);
      mainctx.fillText(contact, 120, canvas.height / 3 + 40);
      // Convert the canvas to a data URL
      setCompositeImageUrl(maincanvas.toDataURL("image/png"));
      console.log(compositeImageUrl);
    };
  };
  const copyTextAndImageToClipboard = () => {
    navigator.clipboard.write([
      new ClipboardItem({ "image/png": dataURLToBlob(compositeImageUrl) }),
    ]);
    console.log("Text and Image copied to clipboard successfully!");
  };
  // Function to convert data URL to Blob
  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div>
      <div>
        <p ref={nameRef}>Jinal Tandel</p>
        <p ref={designationRef}>Associate Trainee</p>
        <p ref={contactRef}>e. jinal.tandel@1rivet.com</p>
      </div>
      <button onClick={generateHandler}>Generate</button>
      <canvas ref={canvasRef}></canvas>
      <button onClick={copyTextAndImageToClipboard}>Copy Text and Image</button>
    </div>
  );
};
