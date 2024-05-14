import React, { useState } from "react";

export const UseToggler = (active = false) => {
  const [isActive, setIsActive] = useState(active);
  return [isActive, setIsActive];
};
