import React, { useState } from 'react';
import CountrySelector from './components/CountrySelector';
import CitySelector from './components/CitySelector';
import DateSelector from './components/DateSelector';
import Dashboard from './components/Dashboard';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const countriesAndCities = {
  USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  India: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Pune', 'Surat', 'Jaipur'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle', 'Wollongong', 'Logan City'],
  Canada: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
  UK: ['London', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield', 'Bradford', 'Liverpool', 'Edinburgh', 'Manchester', 'Bristol'],
  Germany: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
  France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
  China: ['Shanghai', 'Beijing', 'Chongqing', 'Tianjin', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Nanjing', 'Wuhan', 'Xi’an'],
  Japan: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
  Brazil: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre']
};

const sortedCountries = Object.keys(countriesAndCities).sort();

const boxStyle = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 6px 10px rgba(0,0,0,0.15)',
  padding: '25px',
  marginBottom: '25px',
  maxWidth: '400px',
  boxSizing: 'border-box',
  textAlign: 'left'
};

const labelStyle = {
  fontWeight: '600',
  marginBottom: '6px',
  display: 'block',
  color: '#264653',
  fontSize: '18px'
};

const selectStyle = {
  width: '100%',
  padding: '12px 16px',
  fontSize: '18px',
  borderRadius: '12px',
  border: '1.5px solid #ccc',
  marginBottom: '20px',
  outline: 'none',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '14px 24px',
  borderRadius: '14px',
  border: 'none',
  fontSize: '18px',
  fontWeight: '600',
  cursor: 'pointer'
};

const iconButtonStyle = {
  ...buttonStyle,
  padding: '8px 16px',
  borderRadius: '10px'
};

const App = () => {
  const [tripName, setTripName] = useState('');
  const [places, setPlaces] = useState([{ country: '', city: '', date: '' }]);
  const [usePrevCountryForNext, setUsePrevCountryForNext] = useState(false);
  const [weatherResults, setWeatherResults] = useState(null);

  const addPlace = () => {
    let countryForNext = '';
    if (usePrevCountryForNext && places.length > 0) {
      countryForNext = places[places.length - 1].country || '';
    }
    const newPlace = { country: countryForNext, city: '', date: '' };
    setPlaces([...places, newPlace]);
    setUsePrevCountryForNext(false);
  };

  const updatePlace = (index, field, value) => {
    const updatedPlaces = [...places];
    updatedPlaces[index][field] = value;
    if (field === 'country') updatedPlaces[index].city = '';
    setPlaces(updatedPlaces);
  };

  const deletePlace = (index) => {
    setPlaces(places.filter((_, idx) => idx !== index));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newPlaces = [...places];
    [newPlaces[index - 1], newPlaces[index]] = [newPlaces[index], newPlaces[index - 1]];
    setPlaces(newPlaces);
  };

  const moveDown = (index) => {
    if (index === places.length - 1) return;
    const newPlaces = [...places];
    [newPlaces[index], newPlaces[index + 1]] = [newPlaces[index + 1], newPlaces[index]];
    setPlaces(newPlaces);
  };

  const handleCheckWeather = () => {
    setWeatherResults([...places]);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('weather-results-section');
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(tripName ? `${tripName}-WeatherResults.pdf` : 'WeatherResults.pdf');
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#e7f0f7',
      minHeight: '100vh',
      padding: '30px 20px',
      boxSizing: 'border-box',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#2a9d8f', marginBottom: '30px', fontSize: '36px' }}>
        Rain Check - Weather Dashboard
      </h1>

      {/* Trip Name field */}
      <div style={{ maxWidth: '400px', margin: '0 auto 30px', textAlign: 'left' }}>
        <label
          htmlFor="tripName"
          style={{
            fontWeight: '600',
            color: '#264653',
            fontSize: '18px',
            marginBottom: '8px',
            display: 'block'
          }}
        >
          Trip Name
        </label>
        <input
          id="tripName"
          type="text"
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '18px',
            borderRadius: '12px',
            border: '1.5px solid #ccc',
            outline: 'none',
            marginBottom: '22px',
            boxSizing: 'border-box'
          }}
          placeholder="Name your trip (e.g., Europe Adventure)"
          value={tripName}
          onChange={e => setTripName(e.target.value)}
          maxLength={48}
        />
      </div>

      {/* Flex container for place boxes */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '25px',
        marginBottom: '30px'
      }}>
        {places.map((place, idx) => (
          <div key={idx} style={{
            ...boxStyle,
            flex: '0 0 400px'
          }}>
            <label style={labelStyle}>Country</label>
            <select
              style={selectStyle}
              value={place.country}
              onChange={e => updatePlace(idx, 'country', e.target.value)}
            >
              <option value="">Select Country</option>
              {sortedCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <label style={labelStyle}>City</label>
            <select
              style={selectStyle}
              value={place.city}
              onChange={e => updatePlace(idx, 'city', e.target.value)}
              disabled={!place.country}
            >
              <option value="">Select City</option>
              {place.country && countriesAndCities[place.country].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <label style={labelStyle}>Date</label>
            <input
              type="date"
              style={{
                ...selectStyle,
                padding: '12px 14px',
                fontWeight: '500'
              }}
              value={place.date}
              onChange={e => updatePlace(idx, 'date', e.target.value)}
            />

            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                style={{ ...iconButtonStyle, backgroundColor: idx === 0 ? '#B0C4DE' : '#89CFF0' }}
                aria-label="Move up"
              >↑</button>
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === places.length - 1}
                style={{ ...iconButtonStyle, backgroundColor: idx === places.length - 1 ? '#B0C4DE' : '#89CFF0' }}
                aria-label="Move down"
              >↓</button>
              <button
                onClick={() => deletePlace(idx)}
                style={{ ...iconButtonStyle, backgroundColor: '#ff6363', color: '#fff' }}
                aria-label="Delete"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '400px', margin: '0 auto 30px' }}>
        <label style={{ display: 'flex', alignItems: 'center', fontSize: '18px', color: '#264653' }}>
          <input
            type="checkbox"
            style={{ marginRight: '12px', width: '20px', height: '20px' }}
            checked={usePrevCountryForNext}
            onChange={e => setUsePrevCountryForNext(e.target.checked)}
            disabled={places.length === 0 || !places[places.length - 1].country}
          />
          Use previous place's country for next destination
        </label>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button
          onClick={addPlace}
          style={{
            ...buttonStyle,
            backgroundColor: '#2a9d8f',
            color: 'white',
            marginRight: '20px',
            width: '160px'
          }}
        >+ Add Place</button>
        <button
          onClick={handleCheckWeather}
          style={{
            ...buttonStyle,
            backgroundColor: '#264653',
            color: 'white',
            width: '160px'
          }}
        >Check Weather</button>
      </div>

      {weatherResults && (
        <div
          id="weather-results-section"
          style={{
            maxWidth: '600px',
            margin: 'auto',
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '20px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}>
          <h2 style={{ color: '#e76f51', marginBottom: '25px' }}>
            {tripName ? `${tripName} - Weather Prediction Results` : 'Weather Prediction Results'}
          </h2>
          {weatherResults.map((place, idx) => (
            <Dashboard key={idx} country={place.country} city={place.city} date={place.date} />
          ))}
          <button
            onClick={handleDownloadPDF}
            style={{
              ...buttonStyle,
              backgroundColor: '#e9c46a',
              color: '#264653',
              marginTop: '20px',
              width: '180px'
            }}
          >Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default App;
