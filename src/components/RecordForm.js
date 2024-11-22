import React, { useState } from 'react';

function RecordForm({ addRecord }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isIncome, setIsIncome] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isNaN(amount) || amount === '') {
      setError('Amount must be a valid number');
      return;
    }

    setError('');

    const record = {
      amount: isIncome ? parseFloat(amount) : -parseFloat(amount),
      category,
      date,
      description,
    };
    addRecord(record);
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
    setIsIncome(true);
  };

  return (
    <section id="add-record">
      <form onSubmit={handleSubmit}>
      <h2>Add Record</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
        />
        {error && <p className="error">{error}</p>}
        <label>
          <input
            type="checkbox"
            checked={isIncome}
            onChange={() => setIsIncome(!isIncome)}
          />
          Income
        </label>
        <button type="submit">Add Record</button>
      </form>
    </section>
  );
}

export default RecordForm;