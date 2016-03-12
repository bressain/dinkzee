import reducer from '../../reducer'

describe('game/reducer/initial state', () => {
  it('sets scores to zeros and not scored', () => {
    const scores = reducer().scores
    const unscoredValue = { scored: false, value: 0 }
    scores.aces.should.eql(unscoredValue)
    scores.twos.should.eql(unscoredValue)
    scores.threes.should.eql(unscoredValue)
    scores.fours.should.eql(unscoredValue)
    scores.fives.should.eql(unscoredValue)
    scores.sixes.should.eql(unscoredValue)
    scores.upperSubTotal.should.eql(0)
    scores.upperBonus.should.eql(0)
    scores.upperTotal.should.eql(0)
    scores.threeOfAKind.should.eql(unscoredValue)
    scores.fourOfAKind.should.eql(unscoredValue)
    scores.fullHouse.should.eql(unscoredValue)
    scores.smallStraight.should.eql(unscoredValue)
    scores.largeStraight.should.eql(unscoredValue)
    scores.dinkzee.should.eql(unscoredValue)
    scores.chance.should.eql(unscoredValue)
    scores.dinkzeeBonus.should.eql(0)
    scores.lowerTotal.should.eql(0)
    scores.grandTotal.should.eql(0)
  })

  it('sets dice to zeros', () => {
    const dice = reducer().dice
    dice.should.eql([0, 0, 0, 0, 0])
  })

  it('sets throws to 0', () => {
    reducer().throwsLeft.should.eql(3)
  })

  it('sets held dice to empty array', () => {
    reducer().held.should.eql([])
  })
})
