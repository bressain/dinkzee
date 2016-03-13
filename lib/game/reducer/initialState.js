function unscored () {
  return { scored: false, value: 0 }
}
export default {
  dice: [0, 0, 0, 0, 0],
  gameComplete: false,
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
