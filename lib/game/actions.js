import TYPES from './types'

export function setUpperValue (selected) {
  return { type: TYPES.SET_UPPER_VALUE, selected }
}

export function rollDice () {
  return { type: TYPES.ROLL_DICE }
}

export function holdDie (die) {
  return { type: TYPES.HOLD_DIE, die }
}
