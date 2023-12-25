import React, {useState} from 'react'
import './WeatherApp.css'

import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudyIcon from '../assets/cloudy.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humid.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

const WeatherApp = () => {

  const [api_key] = useState("INSERT OWN KEY HERE");
  const [wicon, setWicon] = useState(cloudyIcon);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    location: 'New York, USA',
  });
  const updateWeatherIcon = (iconCode) => {
    if(iconCode === "01d" || iconCode === "01n"){
      setWicon(clearIcon);
    }
    else if(iconCode === "02d" || iconCode === "02n"){
      setWicon(cloudyIcon);
    }
    else if(iconCode === "03d" || iconCode === "03n"){
      setWicon(drizzleIcon);
    }
    else if(iconCode === "04d" || iconCode === "04n"){
      setWicon(drizzleIcon);
    }
    else if(iconCode === "09d" || iconCode === "09n"){
      setWicon(rainIcon);
    }
    else if(iconCode === "10d" || iconCode === "10n"){
      setWicon(rainIcon);
    }
    else if(iconCode === "13d" || iconCode === "13n"){
      setWicon(snowIcon);
    }
    else{
      setWicon(clearIcon)
    }
  };

  const search = async () => {
    if (city==="") return;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Imperial&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();
    let wicon = data.main.icon === "01d" || data.weather[0].icon === "01n" ? clearIcon : null;  

    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: data.main.temp,
      location: data.name,
    });
     
    updateWeatherIcon(data.weather[0].icon);
  };

  return (
    <div className = 'container'>
      <div className = "top-bar">
        <input 
        type="text" 
        className="cityInput" 
        placeholder = 'Search' 
        value = {city}
        onChange={(e) => setCity(e.target.value)}
        />
        <div className = "searchIcon" onClick={search}>
          <img src = {searchIcon} alt = "" />
        </div>
      </div>
      <div className = "weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className= "weather-temp"> {weatherData.temperature}° F</div>
      <div className= "weather-location>">{weatherData.location} </div>
      <div className= "data-container">
        <div className="element">
          <img src={humidityIcon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{weatherData.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="" className="icon" />
          <div className="data">
            <div className="wind-speed">{weatherData.windSpeed} m/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
  }
export default WeatherApp
