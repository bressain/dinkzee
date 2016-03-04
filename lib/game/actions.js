import TYPES from './types'

export function setUpperValue (selected) {
  return { type: TYPES.SET_UPPER_VALUE, selected }
}

export function rollDice (held) {
  return { type: TYPES.ROLL_DICE, held }
}
