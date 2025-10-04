import React from 'react';

const Dashboard = ({ country, city, date }) => {
  return (
    <div>
      <h3>Weather Info for:</h3>
      <p>Country: {country || 'N/A'}</p>
      <p>City: {city || 'N/A'}</p>
      <p>Date: {date || 'N/A'}</p>
      {/* Placeholder for weather data and probability display */}
      <p>Weather condition probabilities will appear here.</p>
    </div>
  );
};

export default Dashboard;
