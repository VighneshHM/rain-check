import React, { useState, useEffect } from 'react';
import CountrySelector from './CountrySelector';
import CitySelector from './CitySelector';
import DateSelector from './DateSelector';
import Dashboard from './Dashboard';

const App = () => {
  const [countries] = useState(['USA', 'India', 'Australia']);  // Example countries
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Load cities for the selected country (mock)
  useEffect(() => {
    if (selectedCountry === 'USA') setCities(['New York', 'Los Angeles', 'Chicago']);
    else if (selectedCountry === 'India') setCities(['Delhi', 'Mumbai', 'Bangalore']);
    else if (selectedCountry === 'Australia') setCities(['Sydney', 'Melbourne', 'Brisbane']);
    else setCities([]);
    setSelectedCity('');  // reset city when country changes
  }, [selectedCountry]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Rain Check - Weather Condition Likelihood</h1>
      <CountrySelector countries={countries} selectedCountry={selectedCountry} onChange={setSelectedCountry} />
      <CitySelector cities={cities} selectedCity={selectedCity} onChange={setSelectedCity} />
      <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
      <Dashboard country={selectedCountry} city={selectedCity} date={selectedDate} />
    </div>
  );
};

export default App;
