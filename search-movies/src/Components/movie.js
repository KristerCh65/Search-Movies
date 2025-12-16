import React , {Component} from "react";
import  PropTypes from "prop-types";
import '../index.css'

export class Movie extends Component{
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        year: PropTypes.string,
        poster: PropTypes.string
    }

    render (){
        const {id, poster, title, year} = this.props

        const handleClick = (e) => {
            e.preventDefault()
            window.location.href = `?id=${id}`
        }

        return(
            <div onClick={handleClick} className="movie-card">
                <div className="movie-poster-container">
                    <img 
                        alt={title}
                        src={poster !== 'N/A' ? poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
                    />
                    <div className="movie-overlay"></div>
                </div>
                <div className="movie-info">
                    <h3 className="movie-title">{title}</h3>
                    <p className="movie-year">{year}</p>
                </div>
            </div>
        )
    }
}