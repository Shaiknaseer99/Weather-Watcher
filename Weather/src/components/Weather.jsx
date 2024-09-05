import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; 

function Weather() {
    const [city, setCity] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=17ffb8af50783e833dcf246ba9ea0af5`
            );
            setData(response.data);
            setCity('')
            setError('');
        } catch (err) {
            setData(null);
            setError('Please enter a valid city name');
        }
    };

    return (
        <div className="app-container">
           
            <h1 className="app-title">Weather Watcher</h1>

           
            <div className="weather-container">
                <div className='place-input'>
                    <input
                        type='text'
                        id='city'
                        placeholder='Enter Your City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className='get-weather' onClick={fetchWeather}>
                        Get Weather
                    </button>
                </div>

                {error && <p className='error-message'>{error}</p>}

                {data && (
                    <div className='display-info'>
                        <h3>City: {data.name}</h3>
                        <p>Temperature: {((data.main.temp - 273.15).toFixed(2))} °C</p>
                        <p>Weather: {data.weather[0].description}</p>
                        <p>Wind Speed: {data.wind.speed} m/s</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
