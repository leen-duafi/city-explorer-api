const express = require('express') // require the express package ==> import React from 'react'
require('dotenv').config();
let data = require('./data/weather.json')
const cors = require('cors');
const app = express() // initialize your express app instance

app.use(cors())
const PORT = process.env.PORT;

class Forecast {
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
      return  new Forecast(items)});
    res.send(forecastArr);
  }
  catch (e) {
    res.status(404).send('No Data for this City');
  }
});

// app.listen(3000) // kick start the express server to work
app.listen(PORT, () => {
  console.log(`this is me ${PORT}`, require('./data/weather.json'))
})