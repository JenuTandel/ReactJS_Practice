import React, { useState } from "react";
import { ExpenseDate } from "./ExpenseDate";
import { Card } from "../UI/Card";
import "./ExpenseItems.css";

export const ExpenseItems = (props) => {
  const [title, setTitle] = useState(props.title);
  const onChangeTitle = () => {
    setTitle("Changed");
    console.log(title);
  };
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date}></ExpenseDate>
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">${props.amount}</div>
          <button onClick={onChangeTitle}>Change Title</button>
        </div>
      </Card>
    </li>
  );
};

/* {
    expense.map((res)=>{
      return (
        <div key={res.title}>
        <p>{res.title}</p>
        <p>{res.amount}</p>
    <p>{res.date.toISOString()}</p>
    </div>
      )
    })} */
