const THEMOVIEDB_KEY = process.env.THEMOVIEDB_KEY;
const THEMOVIEDB_URL = process.env.THEMOVIEDB_URL;
const axios = require('axios');
const Movie = require('../models/Movie');
const Cache = require('../helper/cache.helper')
let cacheObject = new Cache();


// let getMovie = async (req, res) => {
//   let { query } = req.query;
//   let QueryParams2 = {
//     params: {
//       key: THEMOVIEDB_KEY,
//       query: query
//     }
//   }

//   const response2 = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=94244dbb1b056aa2e7a1b54cf7a87581&query=${query}`)
//   const data2 = response2.data.results.map(item => new Movie(item));
//   res.json(data2)
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getMovie = async (query) => {
  // let { query } = req.query;
  let QueryParams2 = {
    params: {
      key: THEMOVIEDB_KEY,
      query: query
    }
  }



  const response2 = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=94244dbb1b056aa2e7a1b54cf7a87581&query=${query}`)
  const data2 = response2.data.results.map(item => new Movie(item));

  cacheObject.movie.push({
    'query': query,
    'data': data2
  })
  return data2

}

let getMovie2 = async (req, res) => {
  let { query } = req.query;
  if (((Date.now() - cacheObject.timestamp) > 86400000)) {
    cacheObject = new Cache();
  }

  if (cacheObject.movie.length) {
    const filterDta = cacheObject.movie.find((location) => {
      return location.query === query
    })
    if (filterDta) { res.json(filterDta.data); }

    else { res.json(await getMovie(query)) }
  } else { res.json(await getMovie(query)) }

}


module.exports = getMovie2