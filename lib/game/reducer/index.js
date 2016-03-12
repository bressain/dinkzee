import initialState from './initialState'
import * as lowerSection from './lowerSection'
import * as upperSection from './upperSection'
import TYPES from '../types'

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
  if (state.throwsLeft === 0 || state.held.length === 5) return state
  return {
    ...state,
    dice: state.dice.map((x, i) => state.held.includes(i) ? x : getRandomDie()),
    throwsLeft: state.throwsLeft - 1
  }
}

export default function (state = initialState, action = {}) {
  const handlers = {
    [TYPES.HOLD_DIE]: holdDie,
    [TYPES.ROLL_DICE]: rollDice,
    [TYPES.SET_3_OF_A_KIND]: lowerSection.set3OfAKind,
    [TYPES.SET_4_OF_A_KIND]: lowerSection.set4OfAKind,
    [TYPES.SET_CHANCE]: lowerSection.setChance,
    [TYPES.SET_DINKZEE]: lowerSection.setDinkzee,
    [TYPES.SET_FULL_HOUSE]: lowerSection.setFullHouse,
    [TYPES.SET_LARGE_STRAIGHT]: lowerSection.setLargeStraight,
    [TYPES.SET_SMALL_STRAIGHT]: lowerSection.setSmallStraight,
    [TYPES.SET_UPPER_VALUE]: upperSection.setUpperScoreValue
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}
