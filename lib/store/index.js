import { combineReducers, createStore } from 'redux'

import game from '../game/reducer'

const dinkzeeApp = combineReducers({
  game
})
const store = createStore(dinkzeeApp)

export default store
