import './App.css';
import { useState } from 'react';

const api = {
  key: '66514f1ca8017015f34d8af307a882cd',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result); // Debugging output
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Header */}
        <h1>Weather App</h1>

        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)} // Move onChange to input
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* If weather is not undefined */}
        {typeof weather.main !== 'undefined' ? (
          <div>
            {/* Location */}
            <p>{weather.name}</p>

            {/* Temperature */}
            <p>{weather.main.temp} °C</p>

            {/* Condition */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ''
        )}
      </header>
    </div>
  );
}

export default App;
