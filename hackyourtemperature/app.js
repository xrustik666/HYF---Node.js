import express from 'express';
import { keys } from "./sources/keys.js";
import fetch from 'node-fetch';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    return res.status(400).send('City name is required');
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('No such a city');
      }
      return response.json();
    })
    .then(function(data) {
      if (data.weather) {
        const temperature = data.main.temp;
        const weatherText = `Current temperature in ${cityName}: ${temperature}°C`;
        res.json({ weatherText });
      } else {
        res.json({ weatherText: "City is not found!" });
      }
    })
    .catch(function(error) {
      res.status(500).send('Error fetching weather data');
    });
});

export default app;