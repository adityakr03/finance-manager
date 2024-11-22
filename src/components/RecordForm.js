import React, { useState   } from 'react';
import CustomCalendar from './CustomCalendar';

function RecordForm({ addRecord }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isIncome, setIsIncome] = useState(true); // Default to Income
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set default to today
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isNaN(amount) || amount === '') {
      setError('Amount must be a valid number');
      return;
    }

    setError('');

    // If description is empty, set to "Misc."
    const finalDescription = description.trim() === '' ? 'Misc.' : description;

    const record = {
      amount: isIncome ? parseFloat(amount) : -parseFloat(amount),
      category,
      date: selectedDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
      description: finalDescription,
    };

    addRecord(record);

    // Reset form fields
    setAmount('');
    setCategory('');
    setDescription('');
    setIsIncome(true);
    setSelectedDate(new Date());
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
        {/* Custom Calendar */}
        <CustomCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
        />
        {error && <p className="error">{error}</p>}
        
        {/* Income/Expense Toggle */}
        <div className="income-toggle">
          <span>{isIncome ? 'Income' : 'Expense'}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isIncome}
              onChange={() => setIsIncome(!isIncome)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <button type="submit">Add Record</button>
      </form>
    </section>
  );
}

export default RecordForm;
