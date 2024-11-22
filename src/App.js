import React, { useState, useEffect } from "react";
import "./App.css";
import RecordForm from "./components/RecordForm";
import SummaryCard from "./components/SummaryCard";
import RecordsCard from "./components/RecordsCard";

function App() {
  const [records, setRecords] = useState([]);
  const [balance, setBalance] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  // Load data from localStorage when the app starts
  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem("records")) || [];
    const savedBalance = parseFloat(localStorage.getItem("balance")) || 0;
    const savedNetIncome = parseFloat(localStorage.getItem("netIncome")) || 0;
    const savedNetExpense = parseFloat(localStorage.getItem("netExpense")) || 0;

    setRecords(savedRecords);
    setBalance(savedBalance);
    setNetIncome(savedNetIncome);
    setNetExpense(savedNetExpense);
  }, []);

  // Save data to localStorage when records, balance, netIncome, or netExpense changes
  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
    localStorage.setItem("balance", balance);
    localStorage.setItem("netIncome", netIncome);
    localStorage.setItem("netExpense", netExpense);
  }, [records, balance, netIncome, netExpense]);

  const addRecord = (newRecord) => {
    setRecords((prevRecords) => {
      const updatedRecords = [...prevRecords, newRecord];
      return updatedRecords;
    });

    const newBalance = balance + newRecord.amount;
    setBalance(newBalance);

    if (newRecord.amount > 0) {
      setNetIncome((prevIncome) => prevIncome + newRecord.amount);
    } else {
      setNetExpense((prevExpense) => prevExpense + Math.abs(newRecord.amount));
    }
  };

  return (
    <div className="container">
      <h1>Personal Finance Manager</h1>
      <RecordForm addRecord={addRecord} />
      <SummaryCard
        balance={balance}
        netIncome={netIncome}
        netExpense={netExpense}
      />
      <RecordsCard records={records} />
    </div>
  );
}

export default App;
