import React from 'react';

const DateSelector = ({ selectedDate, onChange }) => {
  return (
    <div>
      <label>Date of Travel: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={e => onChange(e.target.value)}
        min={new Date().toISOString().split('T')[0]}  // No past dates allowed
      />
    </div>
  );
};

export default DateSelector;
