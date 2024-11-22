import React, { useState, useEffect } from 'react';

const CustomCalendar = ({ selectedDate, setSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    // Calculate the days of the current month
    const days = [];
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Fill in empty days for the start of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Fill in the days of the current month
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    setDaysInMonth(days);
  }, [currentDate]);

  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newDate);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-button" onClick={handlePrevMonth}>‹</button>
        <span className="month-year">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </span>
        <button className="nav-button" onClick={handleNextMonth}>›</button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day-name">{day}</div>
        ))}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day === null ? 'empty' : ''} ${selectedDate.getDate() === day ? 'selected' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
