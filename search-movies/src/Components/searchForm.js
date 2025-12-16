import React, {Component} from 'react';

const API_KEY = 'd09693e2'

export class SearchForm extends Component {
  state = {
    inputMovie: '',
  };

  _handleChange = (e) => {
    this.setState({ inputMovie: e.target.value });
  };

  _handleSubmit = (e) => {
    e.preventDefault()
    const {inputMovie} = this.state
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${inputMovie}`)
    .then(res => res.json())
    .then(results => {
        const{Search = [], totalResults} = results
        console.log({Search, totalResults});
        this.props.onResults(Search);
    })
  }

  render() {
    return (
        <form onSubmit={this._handleSubmit} className="search-form">
            <div className="search-form-wrapper">
                <input
                    className="search-input"
                    onChange={this._handleChange}
                    type="text"
                    placeholder="Search for a movie..."
                    value={this.state.inputMovie}
                />
                <button type="submit" className="search-button">Search</button>
            </div>
        </form>
    );
  }
}