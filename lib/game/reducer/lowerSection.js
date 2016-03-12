import { canGetDinkzeeBonus, getDinkzeeBonus, scored } from './scoreUtils'
import initialState from './initialState'

function unique (array) {
  return array.filter((x, i) => array.indexOf(x) === i)
}

function getLowerTotal (scores) {
  return scores.threeOfAKind.value +
    scores.fourOfAKind.value +
    scores.fullHouse.value +
    scores.smallStraight.value +
    scores.largeStraight.value +
    scores.dinkzee.value +
    getDinkzeeBonus(scores) +
    scores.chance.value
}

export function set3OfAKind (state, action) {
  if (state.scores.threeOfAKind.scored) return state

  const newValue = unique(state.dice).length <= 3
    ? state.dice.reduce((acc, x) => acc + x)
    : 0
  const lowerTotal = getLowerTotal(state.scores) + newValue
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      threeOfAKind: scored(newValue),
      dinkzeeBonus: getDinkzeeBonus(state.scores),
      lowerTotal,
      grandTotal: state.scores.upperTotal + lowerTotal
    },
    throwsLeft: initialState.throwsLeft
  }
}

export function set4OfAKind (state, action) {
  if (state.scores.fourOfAKind.scored) return state

  const newValue = unique(state.dice).length <= 2
    ? state.dice.reduce((acc, x) => acc + x)
    : 0
  const lowerTotal = getLowerTotal(state.scores) + newValue
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      fourOfAKind: scored(newValue),
      dinkzeeBonus: getDinkzeeBonus(state.scores),
      lowerTotal,
      grandTotal: state.scores.upperTotal + lowerTotal
    },
    throwsLeft: initialState.throwsLeft
  }
}

function count (array, value) {
  return array.reduce((acc, x) => {
    return x === value ? acc + 1 : acc
  }, 0)
}

export function setFullHouse (state, action) {
  if (state.scores.fullHouse.scored) return state

  const dieCount = count(state.dice, state.dice[0])
  const isFullHouse = canGetDinkzeeBonus(state.scores) ||
    unique(state.dice).length === 2 &&
    (dieCount === 3 || dieCount === 2)
  const fullHouse = isFullHouse ? 25 : 0
  const lowerTotal = getLowerTotal(state.scores) + fullHouse

  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      fullHouse: scored(fullHouse),
      dinkzeeBonus: getDinkzeeBonus(state.scores),
      lowerTotal,
      grandTotal: state.scores.upperTotal + lowerTotal
    },
    throwsLeft: initialState.throwsLeft
  }
}

function isStraight (dice, straightLength) {
  const uniqueDice = unique(dice)
  if (uniqueDice.length < straightLength) return false

  uniqueDice.sort((x, y) => x - y)
  let sequence = 1
  for (let i = 1; i < uniqueDice.length; i++) {
    sequence = uniqueDice[i - 1] + 1 === uniqueDice[i] ? sequence + 1 : 1
  }
  return sequence >= straightLength
}

export function setSmallStraight (state, action) {
  if (state.scores.smallStraight.scored) return state

  const newValue = canGetDinkzeeBonus(state.scores) || isStraight(state.dice, 4) ? 30 : 0
  const lowerTotal = getLowerTotal(state.scores) + newValue
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      smallStraight: scored(newValue),
      dinkzeeBonus: getDinkzeeBonus(state.scores),
      lowerTotal,
      grandTotal: state.scores.upperTotal + lowerTotal
    },
    throwsLeft: initialState.throwsLeft
  }
}

export function setLargeStraight (state, action) {
  if (state.scores.largeStraight.scored) return state

  const newValue = canGetDinkzeeBonus(state.scores) || isStraight(state.dice, 5) ? 40 : 0
  const lowerTotal = getLowerTotal(state.scores) + newValue
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      largeStraight: scored(newValue),
      dinkzeeBonus: getDinkzeeBonus(state.scores),
      lowerTotal,
      grandTotal: state.scores.upperTotal + lowerTotal
    },
    throwsLeft: initialState.throwsLeft
  }
}

export function setDinkzee (state, action) {
  if (state.scores.dinkzee.scored) return state

  const newValue = unique(state.dice).length === 1 ? 50 : 0
  const lowerTotal = getLowerTotal(state.scores) + newValue
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      dinkzee: scored(newValue),
      lowerTotal,
      grandTotal: state.scores.upperTotal + lowerTotal
    },
    throwsLeft: initialState.throwsLeft
  }
}

export function setChance (state, action) {
  if (state.scores.chance.scored) return state

  const newValue = state.dice.reduce((acc, x) => acc + x)
  const lowerTotal = getLowerTotal(state.scores) + newValue
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      chance: scored(newValue),
      dinkzeeBonus: getDinkzeeBonus(state.scores),
      lowerTotal,
      grandTotal: state.scores.upperTotal + lowerTotal
    },
    throwsLeft: initialState.throwsLeft
  }
}
