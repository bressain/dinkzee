import reducer, { initialState, unscored, scored } from '../reducer'
import TYPES from '../types'

describe('game/reducer', () => {
  describe('/initial state', () => {
    it('sets scores to zeros and not scored', () => {
      const scores = reducer().scores
      const unscoredValue = unscored()
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

  describe('SET_UPPER_VALUE', () => {
    it('should set 0 if no selected dice are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'aces' }
      const nextState = reducer({ ...initialState, dice: [2, 3, 4, 5, 6] }, action)
      nextState.scores.aces.value.should.eql(0)
      nextState.scores.aces.scored.should.be.true
    })

    it('should add up aces that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'aces' }
      const nextState = reducer({ ...initialState, dice: [2, 1, 1, 3, 1] }, action)
      nextState.scores.aces.value.should.eql(3)
      nextState.scores.aces.scored.should.be.true
    })

    it('should add up twos that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'twos' }
      const nextState = reducer({ ...initialState, dice: [2, 1, 2, 3, 6] }, action)
      nextState.scores.twos.value.should.eql(4)
      nextState.scores.twos.scored.should.be.true
    })

    it('should add up threes that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'threes' }
      const nextState = reducer({ ...initialState, dice: [3, 3, 2, 3, 6] }, action)
      nextState.scores.threes.value.should.eql(9)
      nextState.scores.threes.scored.should.be.true
    })

    it('should add up fours that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'fours' }
      const nextState = reducer({ ...initialState, dice: [4, 3, 4, 4, 4] }, action)
      nextState.scores.fours.value.should.eql(16)
      nextState.scores.fours.scored.should.be.true
    })

    it('should add up fives that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'fives' }
      const nextState = reducer({ ...initialState, dice: [5, 5, 5, 5, 5] }, action)
      nextState.scores.fives.value.should.eql(25)
      nextState.scores.fives.scored.should.be.true
    })

    it('should add up sixes that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'sixes' }
      const nextState = reducer({ ...initialState, dice: [4, 6, 5, 1, 3] }, action)
      nextState.scores.sixes.value.should.eql(6)
      nextState.scores.sixes.scored.should.be.true
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
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'sixes' }
      const nextState = reducer(state, action)
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
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'threes' }
      const nextState = reducer(state, action)
      nextState.scores.upperSubTotal.should.eql(63)
      nextState.scores.upperBonus.should.eql(35)
      nextState.scores.upperTotal.should.eql(98)
      nextState.scores.grandTotal.should.eql(98)
    })

    it('should reset throws after scoring', () => {
      const state = { ...initialState, dice: [4, 6, 5, 1, 3], throwsLeft: 0 }
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'sixes' }
      const nextState = reducer(state, action)
      nextState.throwsLeft.should.eql(initialState.throwsLeft)
    })

    it('should reset held dice after scoring', () => {
      const state = { ...initialState, dice: [4, 6, 5, 1, 3], held: [1, 2] }
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'sixes' }
      const nextState = reducer(state, action)
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
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'sixes' }
      const nextState = reducer(state, action)
      nextState.scores.sixes.value.should.eql(state.scores.sixes.value)
      nextState.held.should.eql(state.held)
      nextState.throwsLeft.should.eql(state.throwsLeft)
    })
  })

  describe('SET_3_OF_A_KIND', () => {
    it('should set 0 if there are not 3 of a kind', () => {
      const action = { type: TYPES.SET_3_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [2, 2, 4, 5, 6] }, action)
      nextState.scores.threeOfAKind.value.should.eql(0)
      nextState.scores.threeOfAKind.scored.should.be.true
    })

    it('should add up dice when there is 3 of a kind', () => {
      const action = { type: TYPES.SET_3_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [2, 1, 1, 3, 1] }, action)
      nextState.scores.threeOfAKind.value.should.eql(8)
      nextState.scores.threeOfAKind.scored.should.be.true
    })

    it('should add up dice when there is 4 of a kind', () => {
      const action = { type: TYPES.SET_3_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [2, 1, 1, 1, 1] }, action)
      nextState.scores.threeOfAKind.value.should.eql(6)
      nextState.scores.threeOfAKind.scored.should.be.true
    })

    it('should add up dice when there is 5 of a kind', () => {
      const action = { type: TYPES.SET_3_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [1, 1, 1, 1, 1] }, action)
      nextState.scores.threeOfAKind.value.should.eql(5)
      nextState.scores.threeOfAKind.scored.should.be.true
    })

    it('should add up lower totals on set', () => {
      const state = {
        ...initialState,
        dice: [1, 1, 5, 1, 3],
        scores: {
          ...initialState.scores,
          chance: scored(5)
        }
      }
      const nextState = reducer(state, { type: TYPES.SET_3_OF_A_KIND })
      nextState.scores.lowerTotal.should.eql(16)
      nextState.scores.grandTotal.should.eql(16)
    })

    it('should reset throws and held dice after scoring', () => {
      const state = {
        ...initialState,
        dice: [4, 6, 1, 1, 1],
        held: [2, 4],
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_3_OF_A_KIND })
      nextState.held.should.eql(initialState.held)
      nextState.throwsLeft.should.eql(initialState.throwsLeft)
    })

    it('should ignore scoring and not reset when already scored', () => {
      const state = {
        ...initialState,
        dice: [4, 6, 1, 1, 1],
        held: [2, 4],
        scores: {
          ...initialState.scores,
          threeOfAKind: scored(0)
        },
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_3_OF_A_KIND })
      nextState.scores.threeOfAKind.value.should.eql(state.scores.threeOfAKind.value)
      nextState.held.should.eql(state.held)
      nextState.throwsLeft.should.eql(state.throwsLeft)
    })
  })

  describe('SET_4_OF_A_KIND', () => {
    it('should set 0 if there are not 4 of a kind', () => {
      const action = { type: TYPES.SET_4_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [2, 2, 2, 5, 6] }, action)
      nextState.scores.fourOfAKind.value.should.eql(0)
      nextState.scores.fourOfAKind.scored.should.be.true
    })

    it('should add up dice when there is 4 of a kind', () => {
      const action = { type: TYPES.SET_4_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [2, 1, 1, 1, 1] }, action)
      nextState.scores.fourOfAKind.value.should.eql(6)
      nextState.scores.fourOfAKind.scored.should.be.true
    })

    it('should add up dice when there is 5 of a kind', () => {
      const action = { type: TYPES.SET_4_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [1, 1, 1, 1, 1] }, action)
      nextState.scores.fourOfAKind.value.should.eql(5)
      nextState.scores.fourOfAKind.scored.should.be.true
    })

    it('should add up lower totals on set', () => {
      const state = {
        ...initialState,
        dice: [1, 1, 5, 1, 1],
        scores: {
          ...initialState.scores,
          chance: scored(5)
        }
      }
      const nextState = reducer(state, { type: TYPES.SET_4_OF_A_KIND })
      nextState.scores.lowerTotal.should.eql(14)
      nextState.scores.grandTotal.should.eql(14)
    })

    it('should reset throws and held dice after scoring', () => {
      const state = {
        ...initialState,
        dice: [4, 1, 1, 1, 1],
        held: [2, 4],
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_4_OF_A_KIND })
      nextState.held.should.eql(initialState.held)
      nextState.throwsLeft.should.eql(initialState.throwsLeft)
    })

    it('should ignore scoring and not reset when already scored', () => {
      const state = {
        ...initialState,
        dice: [4, 1, 1, 1, 1],
        held: [2, 4],
        scores: {
          ...initialState.scores,
          fourOfAKind: scored(0)
        },
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_4_OF_A_KIND })
      nextState.scores.fourOfAKind.value.should.eql(state.scores.fourOfAKind.value)
      nextState.held.should.eql(state.held)
      nextState.throwsLeft.should.eql(state.throwsLeft)
    })
  })

  describe('SET_FULL_HOUSE', () => {
    it('should set 0 if it is not a full house', () => {
      const action = { type: TYPES.SET_FULL_HOUSE }
      const nextState = reducer({ ...initialState, dice: [2, 2, 2, 5, 6] }, action)
      nextState.scores.fullHouse.value.should.eql(0)
      nextState.scores.fullHouse.scored.should.be.true
    })

    it('should set score to 25 for a full house', () => {
      const action = { type: TYPES.SET_FULL_HOUSE }
      const nextState = reducer({ ...initialState, dice: [2, 1, 1, 2, 1] }, action)
      nextState.scores.fullHouse.value.should.eql(25)
      nextState.scores.fullHouse.scored.should.be.true
    })

    it('should add up lower totals on set', () => {
      const state = {
        ...initialState,
        dice: [1, 1, 5, 1, 5],
        scores: {
          ...initialState.scores,
          chance: scored(5)
        }
      }
      const nextState = reducer(state, { type: TYPES.SET_FULL_HOUSE })
      nextState.scores.lowerTotal.should.eql(30)
      nextState.scores.grandTotal.should.eql(30)
    })

    it('should reset throws and held dice after scoring', () => {
      const state = {
        ...initialState,
        dice: [1, 4, 1, 1, 4],
        held: [2, 4],
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_FULL_HOUSE })
      nextState.held.should.eql(initialState.held)
      nextState.throwsLeft.should.eql(initialState.throwsLeft)
    })

    it('should ignore scoring and not reset when already scored', () => {
      const state = {
        ...initialState,
        dice: [1, 4, 1, 1, 4],
        held: [2, 4],
        scores: {
          ...initialState.scores,
          fullHouse: scored(0)
        },
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_FULL_HOUSE })
      nextState.scores.fullHouse.value.should.eql(state.scores.fullHouse.value)
      nextState.held.should.eql(state.held)
      nextState.throwsLeft.should.eql(state.throwsLeft)
    })
  })

  describe('SET_SMALL_STRAIGHT', () => {
    it('should set 0 if it is not a small straight', () => {
      const action = { type: TYPES.SET_SMALL_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 5, 6] }, action)
      nextState.scores.smallStraight.value.should.eql(0)
      nextState.scores.smallStraight.scored.should.be.true
    })

    it('should set score to 30 for a small straight', () => {
      const action = { type: TYPES.SET_SMALL_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 2, 4] }, action)
      nextState.scores.smallStraight.value.should.eql(30)
      nextState.scores.smallStraight.scored.should.be.true
    })

    it('should allow a large straight for a small straight', () => {
      const action = { type: TYPES.SET_SMALL_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [5, 1, 3, 2, 4] }, action)
      nextState.scores.smallStraight.value.should.eql(30)
      nextState.scores.smallStraight.scored.should.be.true
    })

    it('should allow for a mid small straight', () => {
      const action = { type: TYPES.SET_SMALL_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [5, 2, 3, 2, 4] }, action)
      nextState.scores.smallStraight.value.should.eql(30)
      nextState.scores.smallStraight.scored.should.be.true
    })

    it('should allow for a high small straight', () => {
      const action = { type: TYPES.SET_SMALL_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [5, 6, 3, 1, 4] }, action)
      nextState.scores.smallStraight.value.should.eql(30)
      nextState.scores.smallStraight.scored.should.be.true
    })

    it('should add up lower totals on set', () => {
      const state = {
        ...initialState,
        dice: [1, 2, 3, 1, 4],
        scores: {
          ...initialState.scores,
          chance: scored(5)
        }
      }
      const nextState = reducer(state, { type: TYPES.SET_SMALL_STRAIGHT })
      nextState.scores.lowerTotal.should.eql(35)
      nextState.scores.grandTotal.should.eql(35)
    })

    it('should reset throws and held dice after scoring', () => {
      const state = {
        ...initialState,
        dice: [1, 4, 2, 3, 5],
        held: [2, 4],
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_SMALL_STRAIGHT })
      nextState.held.should.eql(initialState.held)
      nextState.throwsLeft.should.eql(initialState.throwsLeft)
    })

    it('should ignore scoring and not reset when already scored', () => {
      const state = {
        ...initialState,
        dice: [1, 4, 2, 3, 5],
        held: [2, 4],
        scores: {
          ...initialState.scores,
          smallStraight: scored(0)
        },
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_SMALL_STRAIGHT })
      nextState.scores.smallStraight.value.should.eql(state.scores.smallStraight.value)
      nextState.held.should.eql(state.held)
      nextState.throwsLeft.should.eql(state.throwsLeft)
    })
  })

  describe('SET_LARGE_STRAIGHT', () => {
    it('should set 0 if it is not a large straight', () => {
      const action = { type: TYPES.SET_LARGE_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 5, 6] }, action)
      nextState.scores.largeStraight.value.should.eql(0)
      nextState.scores.largeStraight.scored.should.be.true
    })

    it('should set score to 40 for a large straight', () => {
      const action = { type: TYPES.SET_LARGE_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 5, 4] }, action)
      nextState.scores.largeStraight.value.should.eql(40)
      nextState.scores.largeStraight.scored.should.be.true
    })

    it('should allow for a lower large straight', () => {
      const action = { type: TYPES.SET_LARGE_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [5, 1, 3, 2, 4] }, action)
      nextState.scores.largeStraight.value.should.eql(40)
      nextState.scores.largeStraight.scored.should.be.true
    })

    it('should allow for a high large straight', () => {
      const action = { type: TYPES.SET_LARGE_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [5, 6, 3, 2, 4] }, action)
      nextState.scores.largeStraight.value.should.eql(40)
      nextState.scores.largeStraight.scored.should.be.true
    })

    it('should add up lower totals on set', () => {
      const state = {
        ...initialState,
        dice: [1, 2, 3, 5, 4],
        scores: {
          ...initialState.scores,
          chance: scored(5)
        }
      }
      const nextState = reducer(state, { type: TYPES.SET_LARGE_STRAIGHT })
      nextState.scores.lowerTotal.should.eql(45)
      nextState.scores.grandTotal.should.eql(45)
    })

    it('should reset throws and held dice after scoring', () => {
      const state = {
        ...initialState,
        dice: [1, 4, 2, 3, 5],
        held: [2, 4],
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_LARGE_STRAIGHT })
      nextState.held.should.eql(initialState.held)
      nextState.throwsLeft.should.eql(initialState.throwsLeft)
    })

    it('should ignore scoring and not reset when already scored', () => {
      const state = {
        ...initialState,
        dice: [1, 4, 2, 3, 5],
        held: [2, 4],
        scores: {
          ...initialState.scores,
          largeStraight: scored(0)
        },
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_LARGE_STRAIGHT })
      nextState.scores.largeStraight.value.should.eql(state.scores.largeStraight.value)
      nextState.held.should.eql(state.held)
      nextState.throwsLeft.should.eql(state.throwsLeft)
    })
  })

  describe('SET_DINKZEE', () => {
    it('should set 0 if it is not a dinkzee', () => {
      const action = { type: TYPES.SET_DINKZEE }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 5, 6] }, action)
      nextState.scores.dinkzee.value.should.eql(0)
      nextState.scores.dinkzee.scored.should.be.true
    })

    it('should set score to 50 for a dinkzee', () => {
      const action = { type: TYPES.SET_DINKZEE }
      const nextState = reducer({ ...initialState, dice: [4, 4, 4, 4, 4] }, action)
      nextState.scores.dinkzee.value.should.eql(50)
      nextState.scores.dinkzee.scored.should.be.true
    })

    it('should add up lower totals on set', () => {
      const state = {
        ...initialState,
        dice: [1, 1, 1, 1, 1],
        scores: {
          ...initialState.scores,
          chance: scored(5)
        }
      }
      const nextState = reducer(state, { type: TYPES.SET_DINKZEE })
      nextState.scores.lowerTotal.should.eql(55)
      nextState.scores.grandTotal.should.eql(55)
    })

    it('should reset throws and held dice after scoring', () => {
      const state = {
        ...initialState,
        dice: [1, 1, 1, 1, 1],
        held: [2, 4],
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_DINKZEE })
      nextState.held.should.eql(initialState.held)
      nextState.throwsLeft.should.eql(initialState.throwsLeft)
    })

    it('should ignore scoring and not reset when already scored', () => {
      const state = {
        ...initialState,
        dice: [1, 1, 1, 1, 1],
        held: [2, 4],
        scores: {
          ...initialState.scores,
          dinkzee: scored(0)
        },
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_DINKZEE })
      nextState.scores.dinkzee.value.should.eql(state.scores.dinkzee.value)
      nextState.held.should.eql(state.held)
      nextState.throwsLeft.should.eql(state.throwsLeft)
    })
  })

  describe('SET_CHANCE', () => {
    it('should add up dice', () => {
      const action = { type: TYPES.SET_CHANCE }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 2, 1] }, action)
      nextState.scores.chance.value.should.eql(9)
      nextState.scores.chance.scored.should.be.true
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
      const nextState = reducer(state, { type: TYPES.SET_CHANCE })
      nextState.scores.lowerTotal.should.eql(15)
      nextState.scores.grandTotal.should.eql(15)
    })

    it('should reset throws and held dice after scoring', () => {
      const state = {
        ...initialState,
        dice: [1, 1, 1, 1, 1],
        held: [2, 4],
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_CHANCE })
      nextState.held.should.eql(initialState.held)
      nextState.throwsLeft.should.eql(initialState.throwsLeft)
    })

    it('should ignore scoring and not reset when already scored', () => {
      const state = {
        ...initialState,
        dice: [1, 1, 1, 1, 1],
        held: [2, 4],
        scores: {
          ...initialState.scores,
          chance: scored(0)
        },
        throwsLeft: 0
      }
      const nextState = reducer(state, { type: TYPES.SET_CHANCE })
      nextState.scores.chance.value.should.eql(state.scores.chance.value)
      nextState.held.should.eql(state.held)
      nextState.throwsLeft.should.eql(state.throwsLeft)
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
        const action = { type: TYPES.SET_UPPER_VALUE, selected: 'aces' }
        const nextState = reducer(state, action)
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.aces.value.should.eql(0)
      })

      it('gives dinkzee bonus and dice sum for matching selected upper value', () => {
        const action = { type: TYPES.SET_UPPER_VALUE, selected: 'threes' }
        const nextState = reducer(state, action)
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
        const action = { type: TYPES.SET_3_OF_A_KIND }
        const nextState = reducer({ ...state, dice: [3, 3, 3, 3, 3] }, action)
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.threeOfAKind.value.should.eql(15)
      })

      it('gives dinkzee bonus and full points for full house', () => {
        const action = { type: TYPES.SET_FULL_HOUSE }
        const nextState = reducer({ ...state, dice: [3, 3, 3, 3, 3] }, action)
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.fullHouse.value.should.eql(25)
      })

      it('gives dinkzee bonus and full points for straights', () => {
        const action = { type: TYPES.SET_LARGE_STRAIGHT }
        const nextState = reducer({ ...state, dice: [3, 3, 3, 3, 3] }, action)
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.largeStraight.value.should.eql(40)
      })

      it('gives dinkzee bonus and dice sum for chance', () => {
        const action = { type: TYPES.SET_CHANCE }
        const nextState = reducer({ ...state, dice: [3, 3, 3, 3, 3] }, action)
        nextState.scores.dinkzeeBonus.should.eql(100)
        nextState.scores.chance.value.should.eql(15)
      })

      it('allows multiple bonuses', () => {
        const dice = [3, 3, 3, 3, 3]
        let newState = reducer({ ...state, dice }, { type: TYPES.SET_CHANCE })
        newState = reducer({ ...newState, dice }, { type: TYPES.SET_FULL_HOUSE })
        newState = reducer({ ...newState, dice }, { type: TYPES.SET_SMALL_STRAIGHT })
        newState.scores.dinkzeeBonus.should.eql(300)
      })

      it('includes dinkzee bonus in lower and grand totals', () => {
        const action = { type: TYPES.SET_CHANCE }
        const nextState = reducer({ ...state, dice: [3, 3, 3, 3, 3] }, action)
        nextState.scores.lowerTotal.should.eql(165)
        nextState.scores.grandTotal.should.eql(165)
      })
    })
  })

  describe('ROLL_DICE', () => {
    it('should randomize all dice', () => {
      const nextState = reducer(initialState, { type: TYPES.ROLL_DICE })
      nextState.dice.forEach(x => x.should.not.eql(0))
    })

    it('should not roll dice that are held', () => {
      const action = { type: TYPES.ROLL_DICE }
      const nextState = reducer({ dice: [0, 0, 3, 0, 5], held: [2, 4] }, action)
      nextState.dice[0].should.not.eql(0)
      nextState.dice[1].should.not.eql(0)
      nextState.dice[2].should.eql(3)
      nextState.dice[3].should.not.eql(0)
      nextState.dice[4].should.eql(5)
    })

    it('should decrement throwsLeft', () => {
      const nextState = reducer(initialState, { type: TYPES.ROLL_DICE })
      nextState.throwsLeft.should.eql(initialState.throwsLeft - 1)
    })

    it('should not change state if all dice are held', () => {
      const state = { ...initialState, dice: [1, 2, 3, 4, 5], held: [0, 1, 2, 3, 4] }
      const nextState = reducer(state, { type: TYPES.ROLL_DICE })
      nextState.should.eql(state)
    })

    it('should not change state if no throws left', () => {
      const state = { dice: [1, 2, 3, 4, 5], throwsLeft: 0 }
      const nextState = reducer(state, { type: TYPES.ROLL_DICE })
      nextState.should.eql(state)
    })
  })

  describe('HOLD_DIE', () => {
    it('should add the die to held dice', () => {
      let nextState = reducer(initialState, { type: TYPES.HOLD_DIE, die: 3 })
      nextState = reducer(nextState, { type: TYPES.HOLD_DIE, die: 1 })
      nextState.held.should.eql([3, 1])
    })

    it('should remove the die from being held when set again', () => {
      let nextState = reducer(initialState, { type: TYPES.HOLD_DIE, die: 3 })
      nextState = reducer(nextState, { type: TYPES.HOLD_DIE, die: 3 })
      nextState.held.should.eql([])
    })
  })
})
