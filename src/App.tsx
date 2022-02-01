import React, { Component } from 'react'
import './App.css'
import {
  Provider
} from 'react-redux'
import store from './store'
import RequestPokemonsButton from './components/requestPokemonsButton'
import PokemonList from './components/pokemonList'


class App extends Component {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <div className="App">
          <PokemonList />
          <RequestPokemonsButton />
        </div>
      </Provider>
    )
  }
}

export default App
