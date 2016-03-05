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
  dice: [0, 0, 0, 0, 0],
  held: [],
  scores: {
    aces: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0
  },
  throwsLeft: 3
}

function holdDie (state, action) {
  let held = [...state.held]
  if (held.includes(action.die))
    held.splice(held.indexOf(action.die), 1)
  else
    held.push(action.die)
  return {
    ...state,
    held
  }
}

function getRandomDie () {
  return Math.floor(Math.random() * 6) + 1
}

function rollDice (state, action) {
  if (state.throwsLeft === 0) return state
  return {
    ...state,
    dice: state.dice.map((x, i) => state.held.includes(i) ? x : getRandomDie()),
    throwsLeft: state.throwsLeft - 1
  }
}

function setUpperScoreValue (state, action) {
  const upperValue = upperConstants[action.selected]
  const newValue = state.dice.reduce((acc, curr) => curr === upperValue ? acc + upperValue : acc, 0)
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      [action.selected]: newValue
    },
    throwsLeft: initialState.throwsLeft
  }
}

export default function (state = initialState, action = {}) {
  const handlers = {
    [TYPES.HOLD_DIE]: holdDie,
    [TYPES.ROLL_DICE]: rollDice,
    [TYPES.SET_UPPER_VALUE]: setUpperScoreValue
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}
