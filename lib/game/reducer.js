import TYPES from './types'

const upperConstants = {
  aces: 1,
  twos: 2,
  threes: 3,
  fours: 4,
  fives: 5,
  sixes: 6
}

export const initialState = {
  aces: 0,
  twos: 0,
  threes: 0,
  fours: 0,
  fives: 0,
  sixes: 0
}

function setUpperScoreValue (state, action) {
  const upperValue = upperConstants[action.selected]
  const newValue = action.dice.reduce((acc, curr) => curr === upperValue ? acc + upperValue : acc, 0)
  return { ...state, [action.selected]: newValue }
}

export default function (state = initialState, action = {}) {
  const handlers = {
    [TYPES.SET_UPPER_VALUE]: setUpperScoreValue
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}
