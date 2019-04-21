import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers'
import { Provider } from 'react-redux'
import App from "./components/App.jsx"
import "../sass/global.scss"

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = createStore(reducer,preloadedState,applyMiddleware(thunk))
store.subscribe(() => {
  console.log('store :', store.getState())
})
console.log('initial store',store.getState());
window.onload = function(){
  
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)