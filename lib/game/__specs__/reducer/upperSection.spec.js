import initialState from '../../reducer/initialState'
import { setUpperScoreValue } from '../../reducer/upperSection'
import { scored } from '../../reducer/scoreUtils'

describe('game/reducer/upperSection', () => {
  describe('SET_UPPER_VALUE', () => {
    function assertUpperValue (dice, selected, expected) {
      const nextState = setUpperScoreValue({ ...initialState, dice }, { selected })
      nextState.scores[selected].value.should.eql(expected)
      nextState.scores[selected].scored.should.be.true
    }
    it('should set 0 if no selected dice are held', () => {
      assertUpperValue([2, 3, 4, 5, 6], 'aces', 0)
    })

    it('should add up aces that are held', () => {
      assertUpperValue([2, 1, 1, 3, 1], 'aces', 3)
    })

    it('should add up twos that are held', () => {
      assertUpperValue([2, 1, 2, 3, 6], 'twos', 4)
    })

    it('should add up threes that are held', () => {
      assertUpperValue([3, 3, 2, 3, 6], 'threes', 9)
    })

    it('should add up fours that are held', () => {
      assertUpperValue([4, 3, 4, 4, 4], 'fours', 16)
    })

    it('should add up fives that are held', () => {
      assertUpperValue([5, 5, 5, 5, 5], 'fives', 25)
    })

    it('should add up sixes that are held', () => {
      assertUpperValue([4, 6, 5, 1, 3], 'sixes', 6)
    })

    it('should add up totals on set', () => {
      const state = {
        ...initialState,
        dice: [4, 6, 5, 1, 3],
        scores: {
          ...initialState.scores,
          fives: scored(15)
        }
      }
      const nextState = setUpperScoreValue(state, { selected: 'sixes' })
      nextState.scores.upperSubTotal.should.eql(21)
      nextState.scores.upperTotal.should.eql(21)
      nextState.scores.grandTotal.should.eql(21)
    })

    it('should give bonus when >= 63 subtotal', () => {
      const state = {
        ...initialState,
        dice: [4, 6, 2, 3, 1],
        scores: {
          ...initialState.scores,
          fours: scored(16),
          fives: scored(20),
          sixes: scored(24)
        }
      }
      const nextState = setUpperScoreValue(state, { selected: 'threes' })
      nextState.scores.upperSubTotal.should.eql(63)
      nextState.scores.upperBonus.should.eql(35)
      nextState.scores.upperTotal.should.eql(98)
      nextState.scores.grandTotal.should.eql(98)
    })

    it('should reset throws after scoring', () => {
      const state = { ...initialState, dice: [4, 6, 5, 1, 3], throwsLeft: 0 }
      const nextState = setUpperScoreValue(state, { selected: 'sixes' })
      nextState.throwsLeft.should.eql(initialState.throwsLeft)
    })

    it('should reset held dice after scoring', () => {
      const state = { ...initialState, dice: [4, 6, 5, 1, 3], held: [1, 2] }
      const nextState = setUpperScoreValue(state, { selected: 'sixes' })
      nextState.held.should.eql(initialState.held)
    })

    it('should ignore scoring and not reset when already scored', () => {
      const state = {
        ...initialState,
        dice: [4, 6, 5, 1, 3],
        held: [1, 2],
        scores: {
          ...initialState.scores,
          sixes: scored(0)
        },
        throwsLeft: 0
      }
      const nextState = setUpperScoreValue(state, { selected: 'sixes' })
      nextState.scores.sixes.value.should.eql(state.scores.sixes.value)
      nextState.held.should.eql(state.held)
      nextState.throwsLeft.should.eql(state.throwsLeft)
    })

    it('should set gameComplete to true when all values have been set', () => {
      const state = {
        ...initialState,
        scores: {
          ...initialState.scores,
          aces: scored(3),
          twos: scored(6),
          threes: scored(9),
          fours: scored(12),
          fives: scored(15),
          threeOfAKind: scored(20),
          fourOfAKind: scored(23),
          fullHouse: scored(25),
          smallStraight: scored(30),
          largeStraight: scored(40),
          dinkzee: scored(0),
          chance: scored(34)
        }
      }
      const nextState = setUpperScoreValue(state, { selected: 'sixes' })
      nextState.gameComplete.should.be.true
    })
  })
})
