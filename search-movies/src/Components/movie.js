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

        return(
            <section className="movies">
                <a href={`?id=${id}`} className="card">
                <div className="movie">
                    <figure className="image">
                    <img alt={title}
                        src={poster} className="poster" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="info">
                        <p className="title is-4">{title}</p>
                           <p className="year subtitle is-6">{year}</p>
                    </div>
                </div>
            </a>
            </section>
            
        )
    }
}