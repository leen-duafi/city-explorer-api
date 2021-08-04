const express = require('express') // require the express package ==> import React from 'react'
require('dotenv').config();
const cors = require('cors');
const getMovie = require('./controller/Movie.controller');
const { getWeather1, getWeather2 } = require('./controller/Weather.controller')
const app = express() // initialize your express app instance
const PORT = process.env.PORT;

app.use(cors())

app.get('/', // our endpoint name
  (req, responess) => { // callback function of what we should do with our request
    responess.send('Hello World') // our endpoint function response
  })

app.get('/weather', getWeather1);//from json file
///////////////////////////////lab 08///////////////////
app.get('/weather2', getWeather2);///from api 
///////////////////////////////////////////////////////////////////////////
app.get('/movie', getMovie);

app.listen(PORT, () => console.log('listing on port'))