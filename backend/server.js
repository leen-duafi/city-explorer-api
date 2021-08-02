const express = require('express') // require the express package ==> import React from 'react'
require('dotenv').config();
const app = express() // initialize your express app instance
const PORT = process.env.PORT;

// a server endpoint 
app.get('/', // our endpoint name
    (req, res) => { // callback function of what we should do with our request
        res.send('Hello World') // our endpoint function response
    })

// app.listen(3000) // kick start the express server to work
app.listen(PORT, () => {
    console.log(`this is me ${PORT}`)
})