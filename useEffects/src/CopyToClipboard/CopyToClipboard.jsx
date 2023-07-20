import React, { useState, useRef } from "react";
import logo from "./../assets/react.svg";

export const CopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const divRef = useRef(null);

  const handleCopyClick = () => {
    const divContent = divRef.current;
    console.log(divContent);
    const textarea = document.createElement("textarea");
    textarea.value = divContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setIsCopied(true);
    // Reset the "copied" state after a short delay (optional)
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div>
      <div ref={divRef} style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Your Image"
          style={{ width: "100px", height: "100px" }}
        />
        <p style={{ marginLeft: "10px" }}>React Logo</p>
      </div>
      <button onClick={handleCopyClick}>
        {isCopied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
};
