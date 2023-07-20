import React, { useReducer } from "react";

export const UseReducer1 = () => {
  const initialValue = 0;
  const reducer = (state, action) => {
    if (action.type === "Increment") {
      state = state + 1;
    }
    if (action.type === "Decrement") {
      state = state - 1;
    }
    return state;
  };
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <div>
      <h1>{state}</h1>
      <button type="button" onClick={() => dispatch({ type: "Increment" })}>
        Increment
      </button>
      <button type="button" onClick={() => dispatch({ type: "Decrement" })}>
        Decrement
      </button>
    </div>
  );
};
