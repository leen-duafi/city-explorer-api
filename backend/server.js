const express = require('express') // require the express package ==> import React from 'react'
require('dotenv').config();
let data = require('./data/weather.json')
const cors = require('cors');
const axios = require('axios');
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const THEMOVIEDB_KEY = process.env.THEMOVIEDB_KEY;
const THEMOVIEDB_URL = process.env.THEMOVIEDB_URL;
const app = express() // initialize your express app instance

const Forecast = require('./models/Forecast');
const Movie = require('./models/Movie');
const { response } = require('express');

app.use(cors())
const PORT = process.env.PORT;

class LAB7 {
  constructor(value) {
    this.valid_date = value.valid_date;
    this.description = value.weather.description;
  }
}
// a server endpoint 
app.get('/', // our endpoint name
  (req, responess) => { // callback function of what we should do with our request
    responess.send('Hello World') // our endpoint function response
  })

app.get('/weather', (req, res) => {

  try {
    let { searchQuery, lat, lon } = req.query;
    let weatherDta = data.find(element =>
      element.city_name.toLowerCase() === searchQuery.toLowerCase() ||
      (element.lat === lat && element.lon === lon)
    );
    let forecastArr = weatherDta.data.map(items => {
      console.log(items)
      return new lab7(items)
    });
    res.send(forecastArr);
  }
  catch (e) {
    res.status(404).send('No Data for this City');
  }
});

///////////////////////////////lab 08///////////////////

app.get('/weather2', async (req, res) => {
  let { lat, lon } = req.query;
  // let response = axios.get(`${WEATHERIT_URL}?key=${WEATHERIT_KEY}&lat=${lat}&lon=${lon}`)
  let QueryParams = {
    params: {
      key: WEATHERBIT_KEY,
      lat: lat,
      lon: lon
    }
  }
  const response = await axios.get(WEATHERBIT_URL, QueryParams)
  const data = response.data.data.map(item => new Forecast(item));
  res.json(data);

});
///////////////////////////////////////////////////////////////////////////
app.get('/movie'), async (req, res) => {
  let { searchQuery } = req.query;
  let QueryParams2 = {
    params: {
      key: THEMOVIEDB_KEY,
      searchQuery: searchQuery
    }
  }
  const response2 = await axios.get(THEMOVIEDB_URL, QueryParams2)
  const data2 = response2.data.map(item => new Movie(item))
  res.json(data2)
}
// app.listen(3000) // kick start the express server to work
app.listen(PORT, () => {
  console.log(`this is me ${PORT}`)
})