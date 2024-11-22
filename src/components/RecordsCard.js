import React from 'react';

function RecordsCard({ records }) {
  return (
    <section className="card" id="data-table">
      <h2>Transactions</h2>
      <div id="records-container">
        <ul id="records-list">
          {records.map((record, index) => (
            <li key={index}>
              ₹{Math.abs(record.amount)} - {record.category} -{' '}
              {new Date(record.date).toLocaleDateString()} - {record.description}
              <span className={record.amount < 0 ? 'expense' : 'income'}>
                {record.amount < 0 ? 'Expense' : 'Income'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default RecordsCard;
