import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers'
import { Provider } from 'react-redux'
import App from "./components/App.jsx"
import "../sass/global.scss"

const store = createStore(reducer, applyMiddleware(thunk))
store.subscribe(() => {
  console.log('store :', store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)