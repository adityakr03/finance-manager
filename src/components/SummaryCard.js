import React from 'react';
function SummaryCard({ balance, netIncome, netExpense }) {
  return (
    <section className="summary-card">
      <h2>Finance Summary</h2>
      <div className="summary-details">
        <div className="summary-item">
          <span>Current Balance:</span>
          <span className={`amount ${balance >= 0 ? 'positive' : 'negative'}`}>
            ₹{balance.toFixed(2)}
          </span>
        </div>
        <div className="summary-item summary-income">
          <span>Total Income:</span>
          <span className="amount positive">₹{netIncome.toFixed(2)}</span>
        </div>
        <div className="summary-item summary-expense">
          <span>Total Expense:</span>
          <span className="amount negative">₹{netExpense.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}

export default SummaryCard;