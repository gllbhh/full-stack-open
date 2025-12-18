import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const Weather = ({ city }) => {
	const [weather, setWeather] = useState(null);
	const [iconCodeURL, setIconCodeURL] = useState(null);

	useEffect(() => {
		if (!city) return;
		axios
			.get("https://api.openweathermap.org/data/2.5/weather", {
				params: {
					q: city[0],
					units: "metric",
					appid: apiKey,
				},
			})
			.then((response) => {
				const fetchedWeather = response.data;
				console.log(fetchedWeather);
				console.log("temperature:", fetchedWeather.main.temp, "feels like:", fetchedWeather.main.feels_like);
				console.log("humidity:", fetchedWeather.main.humidity, "pressure:", fetchedWeather.main.pressure);
				console.log("wind speed:", fetchedWeather.wind.speed);

				const fIconCode = fetchedWeather.weather[0];
				console.log(fIconCode);
				setIconCodeURL(`https://openweathermap.org/img/wn/${fIconCode.icon}@2x.png`);
				setWeather(fetchedWeather);
			})
			.catch((error) => {
				console.log("failed to fetch weather");
				setWeather(null);
			});
	}, []);
	const content = weather ? (
		<div>
			<h3>Weather in {city[0]}</h3>
			<p>
				Temperature: {weather.main.temp} <sup>o</sup>C. <br />
				Feels like: {weather.main.feels_like} <sup>o</sup>C
			</p>
			<img src={iconCodeURL} style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)" }} />
			<p>
				Wind: {weather.wind.speed} m/s
				<br />
				Humidity: {weather.main.humidity}%<br />
				Pressure: {weather.main.pressure} hPa
			</p>
		</div>
	) : (
		<p>failed to get weather in {city[0]}</p>
	);
	return <div>{content}</div>;
};

export default Weather;
