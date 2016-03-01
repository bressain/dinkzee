import TYPES from './types'

export function setUpperValue (selected, dice) {
  return { type: TYPES.SET_UPPER_VALUE, selected, dice }
}
