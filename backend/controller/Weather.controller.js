const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const axios = require('axios');
const Forecast = require('../models/Forecast');
const lab7 = require('../models/Lab7');
let data = require('../data/weather.json')

////both ways right but the arrow function is faster as the service is faster to fined a variable(let - function name =>) than find a function name 👌

let getWeather1 = async (req, res) => {

    try {
        let { searchQuery, lat, lon } = req.query;
        let weatherDta = data.find(element =>
            element.city_name.toLowerCase() === searchQuery.toLowerCase() ||
            (element.lat === lat && element.lon === lon)
        );
        let forecastArr = weatherDta.data.map(items => {
            return new lab7(items)
        });
        res.send(forecastArr);
    }
    catch (e) {
        res.status(404).send('No Data for this City');
    }
}



async function getWeather2(req, res) {
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

}

module.exports = { getWeather1, getWeather2 }