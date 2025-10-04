import React from 'react';

const CitySelector = ({ cities, selectedCity, onChange }) => {
  return (
    <div>
      <label>City: </label>
      <select value={selectedCity} onChange={e => onChange(e.target.value)} disabled={!cities.length}>
        <option value="">Select a city</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;
