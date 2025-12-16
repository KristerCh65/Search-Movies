import React, {Component} from "react";
import PropTypes from 'prop-types';

const API_KEY = 'd09693e2'

export class Details extends Component{
    static propTypes = {
        id: PropTypes.string
    }

    state={movie:{}, loading: true, error: null}

    _fetchMovie = ({id}) => {
        this.setState({loading: true, error: null})
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        console.log('Fetching from URL:', url)
        fetch(url)
        .then(res => {
            console.log('Response status:', res.status)
            return res.json()
        })
        .then(movie => {
            console.log('API Response:', movie)
            console.log('Movie keys:', Object.keys(movie))
            console.log('Title:', movie.Title)
            console.log('Response field:', movie.Response)
            if(movie.Response === 'False') {
                this.setState({loading: false, error: movie.Error})
            } else {
                console.log('Setting movie state with:', movie)
                this.setState({movie, loading: false})
            }
        })
        .catch(err => {
            console.error('Fetch error:', err)
            this.setState({loading: false, error: 'Failed to fetch movie details: ' + err.message})
        })
      }

    componentDidMount(){
        this._loadMovie()
    }

    _loadMovie = () => {
        const {id} = this.props
        let movieId = id
        
        console.log('_loadMovie called, id from props:', id)
        
        // If no id prop, try to get from URL
        if(!movieId) {
            const url = new URL(document.location)
            movieId = url.searchParams.get('id')
            console.log('ID from URL:', movieId)
        }
        
        if(movieId) {
            console.log('Fetching movie with ID:', movieId)
            this._fetchMovie({id: movieId})
        } else {
            this.setState({loading: false, error: 'No movie ID provided'})
        }
    }

    render(){
        const {loading, error} = this.state
        
        console.log('Details render - loading:', loading, 'error:', error, 'movie:', this.state.movie)
        
        if(loading) {
            return <div className="detail-page" style={{padding: '20px'}}><p>Loading...</p></div>
        }
        
        if(error) {
            return <div className="detail-page" style={{padding: '20px'}}><p style={{color: 'red'}}>Error: {error}</p></div>
        }
        
        const {Title, Poster, Actors, Metascore, Plot, Year, Genre, Director, Runtime, imdbRating, Rated, Writer, Released} = this.state.movie
        
        if(!Title) {
            return <div className="detail-page" style={{padding: '20px'}}><p>No data loaded yet. Movie: {JSON.stringify(this.state.movie)}</p></div>
        }
        
        return(
            <div className="detail-page">
                <button className="back-button" onClick={() => window.history.back()}>← Back</button>
                
                <div className="detail-container">
                    <div className="detail-poster">
                        <img src={Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/400x600?text=No+Image'} alt={Title}/>
                        {imdbRating && imdbRating !== 'N/A' && (
                            <div className="rating-badge">
                                <span className="rating-number">{imdbRating}</span>
                                <span className="rating-label">IMDB</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="detail-content">
                        <h1 className="detail-title">{Title}</h1>
                        
                        <div className="detail-meta">
                            {Year && <span className="meta-item">{Year}</span>}
                            {Rated && Rated !== 'N/A' && <span className="meta-item rated">{Rated}</span>}
                            {Runtime && Runtime !== 'N/A' && <span className="meta-item">{Runtime}</span>}
                        </div>
                        
                        {Genre && Genre !== 'N/A' && (
                            <div className="detail-genres">
                                {Genre.split(', ').map((genre, i) => (
                                    <span key={i} className="genre-tag">{genre}</span>
                                ))}
                            </div>
                        )}
                        
                        {Metascore && Metascore !== 'N/A' && (
                            <div className="metascore">
                                <span className="metascore-value">{Metascore}</span>
                                <span className="metascore-label">Metascore</span>
                            </div>
                        )}
                        
                        <div className="detail-section">
                            <h3>Director</h3>
                            <p>{Director || 'N/A'}</p>
                        </div>
                        
                        <div className="detail-section">
                            <h3>Writers</h3>
                            <p>{Writer || 'N/A'}</p>
                        </div>
                        
                        <div className="detail-section">
                            <h3>Stars</h3>
                            <p>{Actors || 'N/A'}</p>
                        </div>
                        
                        {Released && Released !== 'N/A' && (
                            <div className="detail-section">
                                <h3>Release Date</h3>
                                <p>{Released}</p>
                            </div>
                        )}
                        
                        {Plot && Plot !== 'N/A' && (
                            <div className="detail-section plot-section">
                                <h3>Plot</h3>
                                <p className="plot-text">{Plot}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}