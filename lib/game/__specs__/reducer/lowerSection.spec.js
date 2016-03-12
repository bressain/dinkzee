import initialState from '../../reducer/initialState'
import { scored } from '../../reducer/scoreUtils'
import {
  set3OfAKind,
  set4OfAKind,
  setChance,
  setDinkzee,
  setFullHouse,
  setLargeStraight,
  setSmallStraight
} from '../../reducer/lowerSection'
import { setUpperScoreValue } from '../../reducer/upperSection'

function assertLowerScore (func, dice, score, expected) {
  const nextState = func({ ...initialState, dice }, {})
  nextState.scores[score].value.should.eql(expected)
  nextState.scores[score].scored.should.be.true
}

function assertLowerTotals (func, dice, expectedTotal) {
  const state = {
    ...initialState,
    dice,
    scores: {
      ...initialState.scores,
      chance: scored(5)
    }
  }
  const nextState = func(state, {})
  nextState.scores.lowerTotal.should.eql(expectedTotal)
  nextState.scores.grandTotal.should.eql(expectedTotal)
}

function assertThrowsAndHeldReset (func, dice) {
  const state = {
    ...initialState,
    dice,
    held: [2, 4],
    throwsLeft: 0
  }
  const nextState = func(state, {})
  nextState.held.should.eql(initialState.held)
  nextState.throwsLeft.should.eql(initialState.throwsLeft)
}

function assertIgnoreScoringAndReset (func, dice, score) {
  const state = {
    ...initialState,
    dice,
    held: [2, 4],
    scores: {
      ...initialState.scores,
      [score]: scored(0)
    },
    throwsLeft: 0
  }
  const nextState = func(state, {})
  nextState.scores[score].value.should.eql(state.scores[score].value)
  nextState.held.should.eql(state.held)
  nextState.throwsLeft.should.eql(state.throwsLeft)
}

describe('game/reducer/lowerSection', () => {
  describe('SET_3_OF_A_KIND', () => {
    it('should set 0 if there are not 3 of a kind', () => {
      assertLowerScore(set3OfAKind, [2, 2, 4, 5, 6], 'threeOfAKind', 0)
    })

    it('should add up dice when there is 3 of a kind', () => {
      assertLowerScore(set3OfAKind, [2, 1, 1, 3, 1], 'threeOfAKind', 8)
    })

    it('should add up dice when there is 4 of a kind', () => {
      assertLowerScore(set3OfAKind, [2, 1, 1, 1, 1], 'threeOfAKind', 6)
    })

    it('should add up dice when there is 5 of a kind', () => {
      assertLowerScore(set3OfAKind, [1, 1, 1, 1, 1], 'threeOfAKind', 5)
    })

    it('should add up lower totals on set', () => {
      assertLowerTotals(set3OfAKind, [1, 1, 5, 1, 3], 16)
    })

    it('should reset throws and held dice after scoring', () => {
      assertThrowsAndHeldReset(set3OfAKind, [4, 6, 1, 1, 1])
    })

    it('should ignore scoring and not reset when already scored', () => {
      assertIgnoreScoringAndReset(set3OfAKind, [4, 6, 1, 1, 1], 'threeOfAKind')
    })
  })

  describe('SET_4_OF_A_KIND', () => {
    it('should set 0 if there are not 4 of a kind', () => {
      assertLowerScore(set4OfAKind, [2, 2, 2, 5, 6], 'fourOfAKind', 0)
    })

    it('should add up dice when there is 4 of a kind', () => {
      assertLowerScore(set4OfAKind, [2, 1, 1, 1, 1], 'fourOfAKind', 6)
    })

    it('should add up dice when there is 5 of a kind', () => {
      assertLowerScore(set4OfAKind, [1, 1, 1, 1, 1], 'fourOfAKind', 5)
    })

    it('should add up lower totals on set', () => {
      assertLowerTotals(set4OfAKind, [1, 1, 5, 1, 1], 14)
    })

    it('should reset throws and held dice after scoring', () => {
      assertThrowsAndHeldReset(set4OfAKind, [4, 1, 1, 1, 1])
    })

    it('should ignore scoring and not reset when already scored', () => {
      assertIgnoreScoringAndReset(set4OfAKind, [4, 1, 1, 1, 1], 'fourOfAKind')
    })
  })

  describe('SET_FULL_HOUSE', () => {
    it('should set 0 if it is not a full house', () => {
      assertLowerScore(setFullHouse, [2, 2, 2, 5, 6], 'fullHouse', 0)
    })

    it('should set score to 25 for a full house', () => {
      assertLowerScore(setFullHouse, [2, 1, 1, 2, 1], 'fullHouse', 25)
    })

    it('should add up lower totals on set', () => {
      assertLowerTotals(setFullHouse, [1, 1, 5, 1, 5], 30)
    })

    it('should reset throws and held dice after scoring', () => {
      assertThrowsAndHeldReset(setFullHouse, [1, 4, 1, 1, 4])
    })

    it('should ignore scoring and not reset when already scored', () => {
      assertIgnoreScoringAndReset(setFullHouse, [1, 4, 1, 1, 4], 'fullHouse')
    })
  })

  describe('SET_SMALL_STRAIGHT', () => {
    it('should set 0 if it is not a small straight', () => {
      assertLowerScore(setSmallStraight, [2, 1, 3, 5, 6], 'smallStraight', 0)
    })

    it('should set score to 30 for a small straight', () => {
      assertLowerScore(setSmallStraight, [2, 1, 3, 2, 4], 'smallStraight', 30)
    })

    it('should allow a large straight for a small straight', () => {
      assertLowerScore(setSmallStraight, [5, 1, 3, 2, 4], 'smallStraight', 30)
    })

    it('should allow for a mid small straight', () => {
      assertLowerScore(setSmallStraight, [5, 2, 3, 2, 4], 'smallStraight', 30)
    })

    it('should allow for a high small straight', () => {
      assertLowerScore(setSmallStraight, [5, 6, 3, 1, 4], 'smallStraight', 30)
    })

    it('should add up lower totals on set', () => {
      assertLowerTotals(setSmallStraight, [1, 2, 3, 1, 4], 35)
    })

    it('should reset throws and held dice after scoring', () => {
      assertThrowsAndHeldReset(setSmallStraight, [1, 4, 2, 3, 5])
    })

    it('should ignore scoring and not reset when already scored', () => {
      assertIgnoreScoringAndReset(setSmallStraight, [1, 4, 2, 3, 5], 'smallStraight')
    })
  })

  describe('SET_LARGE_STRAIGHT', () => {
    it('should set 0 if it is not a large straight', () => {
      assertLowerScore(setLargeStraight, [2, 1, 3, 5, 6], 'largeStraight', 0)
    })

    it('should set score to 40 for a large straight', () => {
      assertLowerScore(setLargeStraight, [2, 1, 3, 5, 4], 'largeStraight', 40)
    })

    it('should allow for a lower large straight', () => {
      assertLowerScore(setLargeStraight, [5, 1, 3, 2, 4], 'largeStraight', 40)
    })

    it('should allow for a high large straight', () => {
      assertLowerScore(setLargeStraight, [5, 6, 3, 2, 4], 'largeStraight', 40)
    })

    it('should add up lower totals on set', () => {
      assertLowerTotals(setLargeStraight, [1, 2, 3, 5, 4], 45)
    })

    it('should reset throws and held dice after scoring', () => {
      assertThrowsAndHeldReset(setLargeStraight, [1, 4, 2, 3, 5])
    })

    it('should ignore scoring and not reset when already scored', () => {
      assertIgnoreScoringAndReset(setLargeStraight, [1, 4, 2, 3, 5], 'largeStraight')
    })
  })

  describe('SET_DINKZEE', () => {
    it('should set 0 if it is not a dinkzee', () => {
      assertLowerScore(setDinkzee, [2, 1, 3, 5, 6], 'dinkzee', 0)
    })

    it('should set score to 50 for a dinkzee', () => {
      assertLowerScore(setDinkzee, [4, 4, 4, 4, 4], 'dinkzee', 50)
    })

    it('should add up lower totals on set', () => {
      assertLowerTotals(setDinkzee, [1, 1, 1, 1, 1], 55)
    })

    it('should reset throws and held dice after scoring', () => {
      assertThrowsAndHeldReset(setDinkzee, [1, 1, 1, 1, 1])
    })

    it('should ignore scoring and not reset when already scored', () => {
      assertIgnoreScoringAndReset(setDinkzee, [1, 1, 1, 1, 1], 'dinkzee')
    })
  })

  describe('SET_CHANCE', () => {
    it('should add up dice', () => {
      assertLowerScore(setChance, [2, 1, 3, 2, 1], 'chance', 9)
    })

    it('should add up lower totals on set', () => {
      const state = {
        ...initialState,
        dice: [1, 1, 2, 5, 1],
        scores: {
          ...initialState.scores,
          threeOfAKind: scored(5)
        }
      }
      const nextState = setChance(state, {})
      nextState.scores.lowerTotal.should.eql(15)
      nextState.scores.grandTotal.should.eql(15)
    })

    it('should reset throws and held dice after scoring', () => {
      assertThrowsAndHeldReset(setChance, [1, 1, 1, 1, 1])
    })

    it('should ignore scoring and not reset when already scored', () => {
      assertIgnoreScoringAndReset(setChance, [1, 1, 1, 1, 1], 'chance')
    })
  })

  describe('/dinkzeeBonus scoring', () => {
    describe('when scoring bonus in upper section', () => {
      const state = {
        ...initialState,
        dice: [3, 3, 3, 3, 3],
        scores: {
          ...initialState.scores,
          dinkzee: scored(50)
        }
      }
      it('gives dinkzee bonus but 0 for unmatched selected upper value', () => {
        const nextState = setUpperScoreValue(state, { selected: 'aces' })
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.aces.value.should.eql(0)
      })

      it('gives dinkzee bonus and dice sum for matching selected upper value', () => {
        const nextState = setUpperScoreValue(state, { selected: 'threes' })
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.threes.value.should.eql(15)
      })
    })

    describe('when scoring bonus in lower section', () => {
      const state = {
        ...initialState,
        scores: {
          ...initialState.scores,
          dinkzee: scored(50)
        }
      }

      it('gives dinkzee bonus and dice sum for "of a kind" values', () => {
        const nextState = set3OfAKind({ ...state, dice: [3, 3, 3, 3, 3] }, {})
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.threeOfAKind.value.should.eql(15)
      })

      it('gives dinkzee bonus and full points for full house', () => {
        const nextState = setFullHouse({ ...state, dice: [3, 3, 3, 3, 3] }, {})
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.fullHouse.value.should.eql(25)
      })

      it('gives dinkzee bonus and full points for straights', () => {
        const nextState = setLargeStraight({ ...state, dice: [3, 3, 3, 3, 3] }, {})
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.largeStraight.value.should.eql(40)
      })

      it('gives dinkzee bonus and dice sum for chance', () => {
        const nextState = setChance({ ...state, dice: [3, 3, 3, 3, 3] }, {})
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.chance.value.should.eql(15)
      })

      it('allows multiple bonuses', () => {
        const dice = [3, 3, 3, 3, 3]
        let newState = setChance({ ...state, dice }, {})
        newState = setFullHouse({ ...newState, dice }, {})
        newState = setSmallStraight({ ...newState, dice }, {})
        newState.scores.dinkzeeBonus.should.eql(300)
      })

      it('includes dinkzee bonus in lower and grand totals', () => {
        const nextState = setChance({ ...state, dice: [3, 3, 3, 3, 3] }, {})
        nextState.scores.lowerTotal.should.eql(165)
        nextState.scores.grandTotal.should.eql(165)
      })
    })
  })
})
