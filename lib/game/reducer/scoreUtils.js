export function scored (value) {
  return { scored: true, value }
}

export function canGetDinkzeeBonus (scores) {
  return scores.dinkzee.scored && scores.dinkzee.value > 0
}

export function getDinkzeeBonus (scores) {
  return canGetDinkzeeBonus(scores)
    ? scores.dinkzeeBonus + 100
    : scores.dinkzeeBonus
}
