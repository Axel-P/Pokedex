import React, { Component } from 'react'
import './App.css'
import {
  Provider
} from 'react-redux'
import store from './store'
import RequestPokemonsButton from './components/requestPokemonsButton'
import DataDisplay from './components/dataDisplay'


class App extends Component {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <div className="App">
          <DataDisplay />
          <RequestPokemonsButton />
        </div>
      </Provider>
    )
  }
}

export default App
