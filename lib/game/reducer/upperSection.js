import { getDinkzeeBonus, scored } from './scoreUtils'
import initialState from './initialState'

const upperConstants = {
  aces: 1,
  twos: 2,
  threes: 3,
  fours: 4,
  fives: 5,
  sixes: 6
}

function getUpperSubTotal (scores) {
  return scores.aces.value +
    scores.twos.value +
    scores.threes.value +
    scores.fours.value +
    scores.fives.value +
    scores.sixes.value
}

export function setUpperScoreValue (state, action) {
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
