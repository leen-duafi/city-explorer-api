const express = require('express') // require the express package ==> import React from 'react'
require('dotenv').config();
require('./data/weather.json')
const cors = require('cors');
const app = express() // initialize your express app instance

app.get('/weather', // our endpoint name
    (request, responess) => { // callback function of what we should do with our request
      responess.status(500).weather();
      // responess.send('Hello Weather')
    })

    app.get('/dogs/:id', (req, res) => {
      let id = req.params.id;
      let response = weather.find((item) => item.id == id);
      
      res.status(200).json(response);
    });

app.use(cors())
const PORT = process.env.PORT;

// a server endpoint 
app.get('/', // our endpoint name
    (req, responess) => { // callback function of what we should do with our request
      responess.send('Hello World') // our endpoint function response
    })

    

// app.listen(3000) // kick start the express server to work
app.listen(PORT, () => {
    console.log(`this is me ${PORT}`,require('./data/weather.json'))
})