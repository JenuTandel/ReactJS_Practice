import React, { useState, useRef, useReducer } from "react";
import { UseToggler } from "use-toggler/UseToggler";

export const DynamicData = () => {
  const [isOn, setIsOn] = UseToggler(true);
  const [imgSrc, setImgSrc] = useState("");
  const initialValue = {
    name: "",
    designation: "",
    contactNumber: "",
    profile: "",
  };

  const canvasRef = useRef(null);
  const [compositeImageUrl, setCompositeImageUrl] = useState(null);

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };
      case "RESET_FORM":
        return initialValue;
      default:
        throw new Error("Unsupported action type");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.files) {
      getBase64(e.target.files[0]);
    }
    dispatch({ type: "UPDATE_FIELD", field: name, value: value });
  };
  const [state, dispatch] = useReducer(reducer, initialValue);

  const getBase64 = async (file) => {
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

  const generateHandler = async (e) => {
    e.preventDefault();

    //Input data
    const name = state.name;
    const des = state.designation;
    const contact = state.contactNumber;

    //image path (base64)
    const imageLogoUrl = "../src/assets/rivetlogo.png";
    const imageUrl = imgSrc;

    // Create an image element to hold the original logo image
    const imageLogo = new Image();
    imageLogo.src = imageLogoUrl;
    imageLogo.height = 80;
    imageLogo.width = 100;
    imageLogo.style.objectFit = "cover";

    // Create an image element to hold the original image
    const image = new Image();
    image.src = imageUrl;
    image.height = 60;
    image.width = 60;
    image.style.objectFit = "cover";

    //main canvas
    const maincanvas = canvasRef.current;
    maincanvas.width = 300;
    maincanvas.height = image.height + imageLogo.height;
    const mainctx = maincanvas.getContext("2d");

    // Wait for the image to load before copying
    image.onload = async () => {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      // Get the canvas context
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

      //   mainctx.drawImage(canvaslogo, 0, 0);
      mainctx.drawImage(canvas, 0, 0);
      // Draw the image on the canvas
      // ctx.drawImage(image, 10, 30);

      // Add the text to the canvas
      mainctx.font = "16px Sans-serif";
      mainctx.fillText(name, 120, maincanvas.height / 3);
      mainctx.fillText(des, 120, maincanvas.height / 3 + 20);
      mainctx.fillText(contact, 120, maincanvas.height / 3 + 40);
      // Convert the canvas to a data URL
      setCompositeImageUrl(maincanvas.toDataURL("image/png"));
    };
    imageLogo.onload = async () => {
      //create canvas for logo
      const canvaslogo = document.createElement("canvas");
      canvaslogo.width = imageLogo.width;
      canvaslogo.height = imageLogo.height;
      const ctxlogo = canvaslogo.getContext("2d");
      ctxlogo.drawImage(imageLogo, 0, 0);
      await mainctx.drawImage(canvaslogo, 0, image.height + 10);
      setCompositeImageUrl(maincanvas.toDataURL("image/png"));
    };
  };
  const copyTextAndImageToClipboard = async () => {
    console.log(compositeImageUrl);
    if (compositeImageUrl !== null) {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": dataURLToBlob(compositeImageUrl) }),
      ]);
      console.log("Text and Image copied to clipboard successfully!");
    }
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
      <form>
        <input
          type="text"
          placeholder="Enter your Name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter your Designation"
          name="designation"
          value={state.designation}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter your ContactNumber"
          name="contactNumber"
          value={state.contact}
          onChange={handleChange}
        />
        <input
          type="file"
          name="profile"
          value={state.profile}
          onChange={handleChange}
        />
        <button onClick={generateHandler}>Generate</button>
      </form>
      <canvas ref={canvasRef}></canvas>
      <button onClick={copyTextAndImageToClipboard}>Copy Text and Image</button>
      <button
        onClick={() => {
          setIsOn((isOn) => !isOn);
        }}
      >
        is Active {`${isOn}`}
      </button>
    </div>
  );
};
