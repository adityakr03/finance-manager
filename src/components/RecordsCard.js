import React from "react";

function RecordsCard({ records, deleteRecord }) {
  return (
    <section className="card" id="data-table">
      <h2>Transactions</h2>
      <ul id="records-list">
        {records.map((record) => (
          <li
            key={record.id}
            className={record.amount > 0 ? "income" : "expense"}
          >
            <div className="record-details">
              <div className="record-amount">
                <span
                  className={`record-type ${record.amount > 0 ? "income" : "expense"}`}
                >
                  {record.amount > 0 ? "Income" : "Expense"}: ₹{Math.abs(record.amount).toFixed(2)}
                </span>
              </div>
              <div className="record-category">
                <span className="label">Category:</span> {record.category}
              </div>
              <div className="record-date">
                <span className="label">Date:</span> {new Date(record.date).toLocaleDateString()}
              </div>
              <div className="record-description">
                <span className="label">Description:</span> {record.description}
              </div>
            </div>
            <button
              onClick={() => deleteRecord(record.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecordsCard;
