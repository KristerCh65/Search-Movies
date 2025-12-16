import './App.css';
import './index.css';
import 'bulma/css/bulma.css'
import {Title} from './Components/Title'
import { SearchForm } from './Components/searchForm';
import React, { Component } from 'react';
import { MoviesList } from './Components/MoviesList';
import {Details} from './Pages/Details'

class App extends Component {

  state = { usedSearch: false, results: []}

  componentDidMount() {
    window.addEventListener('popstate', () => {
      this.forceUpdate()
    })
  }

  _handleResults = (results) => {
    this.setState({results, usedSearch: true})
  }

  _renderResults(){
    return this.state.results.length===0 
    ?  <p>Sorry! Results don't found</p> 
      : <MoviesList movies={this.state.results}/>
      
  }


  render(){
    const url = new URL(document.location)
    const hasId = url.searchParams.has(`id`)
    console.log('App render - hasId:', hasId, 'URL:', document.location.href)
    if(hasId){
      const id = url.searchParams.get(`id`)
      console.log('Rendering Details with id:', id)
      return <Details id={id}/>
    }
    return (
      <div className="App">
        <header className="app-header">
          <Title className="strong">Search Movies</Title>
          <div className='Searchfrom-wrapper'>
            <SearchForm onResults={this._handleResults}/>
          </div>
          {this.state.usedSearch? this._renderResults(): 
          <small>Use the form to search movie</small>}
        </header>
      </div>
    );
  }

  
}

export default App;