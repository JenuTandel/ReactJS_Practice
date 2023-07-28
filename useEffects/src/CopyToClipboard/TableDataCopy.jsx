import React, { useState, useRef, useReducer } from "react";
import logo from "../assets/rivetlogo.png";
import profileSkeleton from "../assets/profile-skeleton.png";

export const TableDataCopy = () => {
  const tableRef = useRef(null);
  const divRef = useRef(null);
  const tdRef = useRef(null);
  const spanRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const initialValue = {
    name: "",
    designation: "",
    email: "",
    department: "",
    contact: "",
    profile: "",
    github: "",
    linkedin: "",
  };

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

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.height = 55;
        image.width = 55;
        image.src = reader.result;

        image.onload = function () {
          // Create a canvas to manipulate the image
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

          // Convert the canvas data to a data URL (base64)
          const imageDataURL = canvas.toDataURL("image/png");

          // Create a new image element with the circular image
          const circularImage = document.createElement("img");
          circularImage.src = imageDataURL;
          const td = tdRef.current;
          const div = divRef.current;
          div.style.display = "none";
          // Add the circular image to the page
          td.appendChild(circularImage);
        };
        // baseURL = reader.result;
        // setImgSrc(baseURL);
        // resolve(baseURL);
      };
    });
  };

  const copyTable = () => {
    // Get the table container element
    const tableContainer = tableRef.current;
    if (!tableContainer) {
      console.error("Table container not found.");
      return;
    }
    const range = document.createRange();
    range.selectNodeContents(tableContainer);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy");
  };
  return (
    <>
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
          type="text"
          placeholder="Enter your Email Id"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter your Department"
          name="department"
          value={state.department}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter your ContactNumber"
          name="contact"
          value={state.contact}
          onChange={handleChange}
        />
        <input
          type="file"
          name="profile"
          value={state.profile}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter your Github link"
          name="github"
          value={state.github}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter your LinkedIn link"
          name="linkedin"
          value={state.linkedin}
          onChange={handleChange}
        />

        {/* <button onClick={generateHandler}>Generate</button> */}
      </form>
      <div ref={tableRef}>
        <table>
          <tbody>
            <tr>
              <td rowSpan={2} ref={tdRef}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    ref={divRef}
                    style={{
                      height: "65px",
                      width: "65px",
                      overflow: "hidden",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src={profileSkeleton}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>
              </td>
              <td
                style={{
                  fontSize: "16pt",
                  fontWeight: "500",
                  textAlign: "left",
                }}
              >
                {state.name}
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: "12pt", textAlign: "left" }}>
                {state.designation} |
                <span style={{ color: "red" }}>{state.department}</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <img src={logo}></img>
              </td>
              <td
                style={{
                  cursor: "pointer",
                  fontSize: "10pt",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "red" }}>e. </span>
                {state.email}
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: "10pt", textAlign: "left" }}>
                <span style={{ color: "red" }}>tel.</span>
                {state.contact}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={copyTable}>Copy Table</button>
    </>
  );
};
