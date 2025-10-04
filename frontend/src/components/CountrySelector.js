import React from 'react';

const CountrySelector = ({ countries, selectedCountry, onChange }) => {
  return (
    <div>
      <label>Country: </label>
      <select value={selectedCountry} onChange={e => onChange(e.target.value)}>
        <option value="">Select a country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
