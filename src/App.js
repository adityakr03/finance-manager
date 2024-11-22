import React, { useState, useEffect } from "react";
import "./App.css";
import RecordForm from "./components/RecordForm";
import SummaryCard from "./components/SummaryCard";
import RecordsCard from "./components/RecordsCard";
import { encryptData, decryptData } from "./utils/cryptoUtils";

function App() {
  const [records, setRecords] = useState([]);
  const [balance, setBalance] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  // Load data from encrypted localStorage when the app starts
  useEffect(() => {
    const savedRecords = decryptData(localStorage.getItem("records")) || [];
    const savedBalance = parseFloat(decryptData(localStorage.getItem("balance"))) || 0;
    const savedNetIncome = parseFloat(decryptData(localStorage.getItem("netIncome"))) || 0;
    const savedNetExpense = parseFloat(decryptData(localStorage.getItem("netExpense"))) || 0;

    setRecords(savedRecords);
    setBalance(savedBalance);
    setNetIncome(savedNetIncome);
    setNetExpense(savedNetExpense);
  }, []);

  // Save data to encrypted localStorage when records, balance, netIncome, or netExpense changes
  useEffect(() => {
    localStorage.setItem("records", encryptData(records));
    localStorage.setItem("balance", encryptData(balance));
    localStorage.setItem("netIncome", encryptData(netIncome));
    localStorage.setItem("netExpense", encryptData(netExpense));
  }, [records, balance, netIncome, netExpense]);

  // Add a new record
  const addRecord = (newRecord) => {
    setRecords((prevRecords) => {
      const updatedRecords = [...prevRecords, { ...newRecord, id: Date.now() }];
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

  // Delete a record
  const deleteRecord = (id) => {
    console.log("Deleting record with id:", id); // Log the id being deleted
    const recordToDelete = records.find((record) => record.id === id);

    if (!recordToDelete) {
      console.log("Record not found");
      return; // Exit if no record is found
    }

    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));

    setBalance((prevBalance) => prevBalance - recordToDelete.amount);

    if (recordToDelete.amount > 0) {
      setNetIncome((prevIncome) => prevIncome - recordToDelete.amount);
    } else {
      setNetExpense((prevExpense) => prevExpense - Math.abs(recordToDelete.amount));
    }
  };

  // Reset all records
  const resetAllRecords = () => {
    setRecords([]);
    setBalance(0);
    setNetIncome(0);
    setNetExpense(0);
    // Optionally, reset localStorage as well
    localStorage.setItem("records", encryptData([]));
    localStorage.setItem("balance", encryptData(0));
    localStorage.setItem("netIncome", encryptData(0));
    localStorage.setItem("netExpense", encryptData(0));
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
      <RecordsCard records={records} deleteRecord={deleteRecord} />
      <button className="reset-btn" onClick={resetAllRecords}>Reset Records</button>
    </div>
  );
}

export default App;
