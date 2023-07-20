import React from "react";

export const ConceptsList = (props) => {
  return (
    <li className="concept">
      <img src={props.list.image} alt={props.list.title} />
      <h2>{props.list.title}</h2>
      <p>{props.list.description}</p>
    </li>
  );
};
