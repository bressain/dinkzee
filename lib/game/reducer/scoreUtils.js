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

export function isGameComplete (scores) {
  return scores.aces.scored &&
    scores.twos.scored &&
    scores.threes.scored &&
    scores.fours.scored &&
    scores.fives.scored &&
    scores.sixes.scored &&
    scores.threeOfAKind.scored &&
    scores.fourOfAKind.scored &&
    scores.fullHouse.scored &&
    scores.smallStraight.scored &&
    scores.largeStraight.scored &&
    scores.dinkzee.scored &&
    scores.chance.scored
}
