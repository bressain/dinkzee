import TYPES from './types'

export function setUpperValue (selected) {
  return { type: TYPES.SET_UPPER_VALUE, selected }
}

export function set3OfAKind () {
  return { type: TYPES.SET_3_OF_A_KIND }
}

export function set4OfAKind () {
  return { type: TYPES.SET_4_OF_A_KIND }
}

export function setFullHouse () {
  return { type: TYPES.SET_FULL_HOUSE }
}

export function setSmallStraight () {
  return { type: TYPES.SET_SMALL_STRAIGHT }
}

export function setLargeStraight () {
  return { type: TYPES.SET_LARGE_STRAIGHT }
}

export function setDinkzee () {
  return { type: TYPES.SET_DINKZEE }
}

export function setChance () {
  return { type: TYPES.SET_CHANCE }
}

export function rollDice () {
  return { type: TYPES.ROLL_DICE }
}

export function holdDie (die) {
  return { type: TYPES.HOLD_DIE, die }
}
