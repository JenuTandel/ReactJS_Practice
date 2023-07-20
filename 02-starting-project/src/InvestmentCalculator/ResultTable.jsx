import React from "react";
import "./ResultTable.css";

export const ResultTable = (props) => {
  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((res) => (
          <tr key={res.year}>
            <td>{res.year}</td>
            <td>{Math.round(res.savingsEndOfYear)}</td>
            <td>{Math.round(res.yearlyInterest)}</td>
            <td>
              {Math.round(
                res.savingsEndOfYear -
                  props.initialInvestment -
                  res.yearlyContribution * res.year
              )}
            </td>
            <td>
              {+props.initialInvestment + res.yearlyContribution * res.year}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
