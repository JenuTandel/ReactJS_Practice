import React, { useState } from "react";
import { Header } from "./Header/Header";
import { InvestmentForm } from "./InvestmentCalculator/InvestmentForm";
import { ResultTable } from "./InvestmentCalculator/ResultTable";

function App() {
  const [formData, setformData] = useState([]);
  const [currentSavings, setCurrentSavings] = useState([]);
  const onSubmitDataHandler = (props) => {
    setformData(props);
  };
  const onCurrentSavingsHandler = (props) => {
    setCurrentSavings(props);
  };
  return (
    <div>
      <Header></Header>
      <InvestmentForm
        onSubmitData={onSubmitDataHandler}
        getCurrentSavings={onCurrentSavingsHandler}
      ></InvestmentForm>
      {formData.length > 0 ? (
        <ResultTable
          data={formData}
          initialInvestment={currentSavings}
        ></ResultTable>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
