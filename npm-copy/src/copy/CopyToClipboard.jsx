import React, { useState } from "react";

export const CopyToClipboard = (imageData) => {
  console.log(imageData);
  const [imgSrc, setImgSrc] = useState(imageData);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        setImgSrc(baseURL);
        resolve(baseURL);
      };
    });
  };

  getBase64(imageData);

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

  navigator.clipboard.write([
    new ClipboardItem({ "image/png": dataURLToBlob(imgSrc) }),
  ]);

  return imgSrc;
};

// export  CopyToClipboard;
