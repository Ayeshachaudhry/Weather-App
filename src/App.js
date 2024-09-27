import './App.css';
import { useState } from 'react';

const api = {
  key: '66514f1ca8017015f34d8af307a882cd',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPressed = () => {
    setLoading(true);
    setError(null);
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.cod !== 200) {
          setError(result.message);
          setWeather({});
        } else {
          setWeather(result);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError('Failed to fetch data');
        console.error(err); // Debugging error
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>

        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* Loading Indicator */}
        {loading && <p>Loading...</p>}

        {/* Error Message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Weather Info */}
        {typeof weather.main !== 'undefined' && !loading && !error && (
          <div>
            <p>{weather.name}</p>
            <p>{weather.main.temp} °C</p>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
