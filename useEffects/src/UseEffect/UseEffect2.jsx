import React, { useState, useEffect } from "react";

export const UseEffect2 = () => {
  const [windowWidth, setWindowWidth] = useState(window.screen.width);

  const actualWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", actualWidth);
  });

  useEffect(() => {
    window.addEventListener("resize", actualWidth);

    return () => {
      window.removeEventListener("resize", actualWidth);
    };
  });

  return (
    <div>
      <p>The actual size of window</p>
      <h2>{windowWidth}</h2>
    </div>
  );
};
