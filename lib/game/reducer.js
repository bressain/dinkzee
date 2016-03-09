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
    sixes: 0,
    upperSubTotal: 0,
    upperBonus: 0,
    upperTotal: 0,
    threeOfAKind: 0,
    fourOfAKind: 0,
    fullHouse: 0,
    smallStraight: 0,
    largeStraight: 0,
    dinkzee: 0,
    chance: 0
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

function getUpperSubTotal (scores) {
  return scores.aces +
    scores.twos +
    scores.threes +
    scores.fours +
    scores.fives +
    scores.sixes
}

function setUpperScoreValue (state, action) {
  const upperValue = upperConstants[action.selected]
  const newValue = state.dice.reduce((acc, x) => x === upperValue ? acc + upperValue : acc, 0)
  const upperSubTotal = getUpperSubTotal(state.scores) + newValue
  const bonus = upperSubTotal >= 63 ? 35 : 0
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      [action.selected]: newValue,
      upperSubTotal: upperSubTotal,
      upperBonus: bonus,
      upperTotal: upperSubTotal + bonus
    },
    throwsLeft: initialState.throwsLeft
  }
}

function unique (array) {
  return array.filter((x, i) => array.indexOf(x) === i)
}

function set3OfAKind (state, action) {
  if (unique(state.dice).length > 3) return state
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      threeOfAKind: state.dice.reduce((acc, x) => acc + x)
    },
    throwsLeft: initialState.throwsLeft
  }
}

function set4OfAKind (state, action) {
  if (unique(state.dice).length > 2) return state
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      fourOfAKind: state.dice.reduce((acc, x) => acc + x)
    },
    throwsLeft: initialState.throwsLeft
  }
}

function count (array, value) {
  return array.reduce((acc, x) => {
    return x === value ? acc + 1 : acc
  }, 0)
}

function setFullHouse (state, action) {
  if (unique(state.dice).length !== 2) return state

  const dieCount = count(state.dice, state.dice[0])
  if (dieCount === 1 || dieCount === 4) return state

  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      fullHouse: 25
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

function setSmallStraight (state, action) {
  if (!isStraight(state.dice, 4)) return state
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      smallStraight: 30
    },
    throwsLeft: initialState.throwsLeft
  }
}

function setLargeStraight (state, action) {
  if (!isStraight(state.dice, 5)) return state
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      largeStraight: 40
    },
    throwsLeft: initialState.throwsLeft
  }
}

function setDinkzee (state, action) {
  if (unique(state.dice).length > 1) return state
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      dinkzee: 50
    },
    throwsLeft: initialState.throwsLeft
  }
}

function setChance (state, action) {
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      chance: state.dice.reduce((acc, x) => acc + x)
    },
    throwsLeft: initialState.throwsLeft
  }
}

// TODO: prevent setting to a value after it was set to zero
export default function (state = initialState, action = {}) {
  const handlers = {
    [TYPES.HOLD_DIE]: holdDie,
    [TYPES.ROLL_DICE]: rollDice,
    [TYPES.SET_3_OF_A_KIND]: set3OfAKind,
    [TYPES.SET_4_OF_A_KIND]: set4OfAKind,
    [TYPES.SET_CHANCE]: setChance,
    [TYPES.SET_DINKZEE]: setDinkzee,
    [TYPES.SET_FULL_HOUSE]: setFullHouse,
    [TYPES.SET_LARGE_STRAIGHT]: setLargeStraight,
    [TYPES.SET_SMALL_STRAIGHT]: setSmallStraight,
    [TYPES.SET_UPPER_VALUE]: setUpperScoreValue
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}
