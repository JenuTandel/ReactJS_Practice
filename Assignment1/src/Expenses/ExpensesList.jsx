import React from "react";
import { ExpenseItems } from "./ExpenseItems";
import "./ExpensesList.css";
export const ExpensesList = (props) => {
  if (props.expenses.length === 0) {
    return <h2 className="expenses-list__fallback">No Expense Found</h2>;
  }
  return (
    <ul className="expenses-list">
      {props.expenses.map((res) => (
        <ExpenseItems
          key={res.id}
          title={res.title}
          amount={res.amount}
          date={res.date}
        ></ExpenseItems>
      ))}
      ;
    </ul>
  );
};
