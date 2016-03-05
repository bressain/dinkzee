import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'

import Game from './game'
import store from './store'
import 'normalize.css'
import './index.css'

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('app')
)
