import React from "react";
import { ExpenseForm } from "./ExpenseForm";
import "./NewExpense.css";

export const NewExpense = (props) => {
  const onSaveExpenseHandler = (storedExpenseData) => {
    const expenseData = {
      ...storedExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
  };
  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={onSaveExpenseHandler}></ExpenseForm>
    </div>
  );
};
