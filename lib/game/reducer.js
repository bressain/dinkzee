import TYPES from './types'

const upperConstants = {
  aces: 1,
  twos: 2,
  threes: 3,
  fours: 4,
  fives: 5,
  sixes: 6
}

function unscored () {
  return { scored: false, value: 0 }
}

export const initialState = {
  dice: [0, 0, 0, 0, 0],
  held: [],
  scores: {
    aces: unscored(),
    twos: unscored(),
    threes: unscored(),
    fours: unscored(),
    fives: unscored(),
    sixes: unscored(),
    upperSubTotal: 0,
    upperBonus: 0,
    upperTotal: 0,
    threeOfAKind: unscored(),
    fourOfAKind: unscored(),
    fullHouse: unscored(),
    smallStraight: unscored(),
    largeStraight: unscored(),
    dinkzee: unscored(),
    chance: unscored(),
    dinkzeeBonus: 0,
    lowerTotal: 0,
    grandTotal: 0
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
  return scores.aces.value +
    scores.twos.value +
    scores.threes.value +
    scores.fours.value +
    scores.fives.value +
    scores.sixes.value
}

function scored (value) {
  return { scored: true, value }
}

function canGetDinkzeeBonus (scores) {
  return scores.dinkzee.scored && scores.dinkzee.value > 0
}

function getDinkzeeBonus (scores) {
  return canGetDinkzeeBonus(scores)
    ? scores.dinkzeeBonus + 100
    : scores.dinkzeeBonus
}

function setUpperScoreValue (state, action) {
  if (state.scores[action.selected].scored) return state

  const upperValue = upperConstants[action.selected]
  const newValue = state.dice.reduce((acc, x) => x === upperValue ? acc + upperValue : acc, 0)
  const upperSubTotal = getUpperSubTotal(state.scores) + newValue
  const upperBonus = upperSubTotal >= 63 ? 35 : 0
  const upperTotal = upperSubTotal + upperBonus
  return {
    ...state,
    held: initialState.held,
    scores: {
      ...state.scores,
      [action.selected]: scored(newValue),
      upperSubTotal,
      upperBonus,
      upperTotal,
      dinkzeeBonus: getDinkzeeBonus(state.scores),
      grandTotal: upperTotal + state.scores.lowerTotal
    },
    throwsLeft: initialState.throwsLeft
  }
}

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

function set3OfAKind (state, action) {
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

function set4OfAKind (state, action) {
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

function setFullHouse (state, action) {
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

function setSmallStraight (state, action) {
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

function setLargeStraight (state, action) {
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

function setDinkzee (state, action) {
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

function setChance (state, action) {
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
