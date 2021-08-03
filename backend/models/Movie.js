class Movie {
    constructor(movie) {
        this.title = movie.title
        this.overview = movie.overview
        this.total_votes = movie.total_votes
        this.image_url = movie.image_url
        this.popularity = movie.popularity
        this.released_on = movie.released_on

    }
}


module.exports = Movie ;