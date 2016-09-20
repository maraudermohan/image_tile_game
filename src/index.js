import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
//import rootReducer from './reducers'
//import App from './components/App'
//import styles from './styles/style.css'

let store = createStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)