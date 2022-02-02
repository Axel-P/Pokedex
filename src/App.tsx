import React, { Component } from 'react'
import './App.css'
import {
  Provider
} from 'react-redux'
import store from './store'
import RootContainer from './components/rootContainer'
class App extends Component {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
