import React, { useState } from "react";
import "./Expenses.css";
import { Card } from "../UI/Card";
import { ExpenseFilter } from "./ExpenseFilter";
import { ExpensesList } from "./ExpensesList";
import { ExpensesChart } from "./ExpensesChart";

export const Expenses = (props) => {
  const [selectedYear, setSelectedYear] = useState("2021");
  const selectedYearData = (year) => {
    setSelectedYear(year);
  };
  // const data = props.items.map((res) => (
  //   <ExpenseItems
  //     key={res.id}
  //     title={res.title}
  //     amount={res.amount}
  //     date={res.date}
  //   ></ExpenseItems>
  // ));
  const data = props.items.filter(
    (res) => res.date.getFullYear() == selectedYear
  );

  return (
    <div>
      <Card className="expenses">
        <ExpenseFilter
          selected={selectedYear}
          getSelectedYear={selectedYearData}
        ></ExpenseFilter>
        <ExpensesChart expenses={data}></ExpensesChart>
        <ExpensesList expenses={data}></ExpensesList>
      </Card>
    </div>
  );
};
