import React, {Component} from "react";
import PropTypes from 'prop-types';

const API_KEY = 'd09693e2'

export class Details extends Component{
    static propTypes = {
        id: PropTypes.string
    }

    state={movie:{}}

    _fetchMovie = ({id}) => {
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
        .then(res => res.json())
        .then(movie => {
            console.log({movie})
            this.setState({movie})
        })
      }

    componentDidMount(){
        const {id} = this.props
        this._fetchMovie({id})
    }

    render(){
        const {Title, Poster, Actors, Metascore, Plot } = this.state.movie
        return(
            <div className="detail">
                <img src={Poster} className="poster"/>
                <div className="title">{Title}</div>
                <div className="info">
                <span className="year">{Actors}</span>
                <span className="length">{Metascore}</span>
                </div>                
                <div className="desc">{Plot}</div>
            </div>
        )
    }
}