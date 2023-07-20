import React from "react";
import "./Chart.css";
import { ChartBar } from "./ChartBar";

export const Chart = (props) => {
  const dataPointValues = props.dataPoints.map(
    (dataPoints) => dataPoints.value
  );
  const totalMax = Math.max(...dataPointValues);
  return (
    <div className="chart">
      {props.dataPoints.map((item) => (
        <ChartBar
          key={item.label}
          value={item.value}
          maxValue={totalMax}
          label={item.label}
        ></ChartBar>
      ))}
    </div>
  );
};
