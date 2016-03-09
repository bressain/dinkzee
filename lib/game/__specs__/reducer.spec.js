import reducer, { initialState } from '../reducer'
import TYPES from '../types'

describe('game/reducer', () => {
  describe('/initial state', () => {
    it('sets scores to zeros', () => {
      const scores = reducer().scores
      scores.aces.should.eql(0)
      scores.twos.should.eql(0)
      scores.threes.should.eql(0)
      scores.fours.should.eql(0)
      scores.fives.should.eql(0)
      scores.sixes.should.eql(0)
      scores.upperSubTotal.should.eql(0)
      scores.upperBonus.should.eql(0)
      scores.upperTotal.should.eql(0)
      scores.threeOfAKind.should.eql(0)
      scores.fourOfAKind.should.eql(0)
      scores.fullHouse.should.eql(0)
      scores.smallStraight.should.eql(0)
      scores.largeStraight.should.eql(0)
      scores.dinkzee.should.eql(0)
      scores.chance.should.eql(0)
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
      nextState.scores.aces.should.eql(0)
    })

    it('should add up aces that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'aces' }
      const nextState = reducer({ ...initialState, dice: [2, 1, 1, 3, 1] }, action)
      nextState.scores.aces.should.eql(3)
    })

    it('should add up twos that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'twos' }
      const nextState = reducer({ ...initialState, dice: [2, 1, 2, 3, 6] }, action)
      nextState.scores.twos.should.eql(4)
    })

    it('should add up threes that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'threes' }
      const nextState = reducer({ ...initialState, dice: [3, 3, 2, 3, 6] }, action)
      nextState.scores.threes.should.eql(9)
    })

    it('should add up fours that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'fours' }
      const nextState = reducer({ ...initialState, dice: [4, 3, 4, 4, 4] }, action)
      nextState.scores.fours.should.eql(16)
    })

    it('should add up fives that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'fives' }
      const nextState = reducer({ ...initialState, dice: [5, 5, 5, 5, 5] }, action)
      nextState.scores.fives.should.eql(25)
    })

    it('should add up sixes that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'sixes' }
      const nextState = reducer({ ...initialState, dice: [4, 6, 5, 1, 3] }, action)
      nextState.scores.sixes.should.eql(6)
    })

    it('should add up upper totals on set', () => {
      const state = {
        ...initialState,
        dice: [4, 6, 5, 1, 3],
        scores: {
          ...initialState.scores,
          fives: 15
        }
      }
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'sixes' }
      const nextState = reducer(state, action)
      nextState.scores.upperSubTotal.should.eql(21)
      nextState.scores.upperTotal.should.eql(21)
    })

    it('should give bonus when >= 63 subtotal', () => {
      const state = {
        ...initialState,
        dice: [4, 6, 2, 3, 1],
        scores: {
          ...initialState.scores,
          fours: 16,
          fives: 20,
          sixes: 24
        }
      }
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'threes' }
      const nextState = reducer(state, action)
      nextState.scores.upperSubTotal.should.eql(63)
      nextState.scores.upperBonus.should.eql(35)
      nextState.scores.upperTotal.should.eql(98)
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
  })

  describe('SET_3_OF_A_KIND', () => {
    it('should set 0 if there are not 3 of a kind', () => {
      const action = { type: TYPES.SET_3_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [2, 2, 4, 5, 6] }, action)
      nextState.scores.threeOfAKind.should.eql(0)
    })

    it('should add up dice when there is 3 of a kind', () => {
      const action = { type: TYPES.SET_3_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [2, 1, 1, 3, 1] }, action)
      nextState.scores.threeOfAKind.should.eql(8)
    })

    it('should add up dice when there is 4 of a kind', () => {
      const action = { type: TYPES.SET_3_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [2, 1, 1, 1, 1] }, action)
      nextState.scores.threeOfAKind.should.eql(6)
    })

    it('should add up dice when there is 5 of a kind', () => {
      const action = { type: TYPES.SET_3_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [1, 1, 1, 1, 1] }, action)
      nextState.scores.threeOfAKind.should.eql(5)
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
  })

  describe('SET_4_OF_A_KIND', () => {
    it('should set 0 if there are not 4 of a kind', () => {
      const action = { type: TYPES.SET_4_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [2, 2, 2, 5, 6] }, action)
      nextState.scores.fourOfAKind.should.eql(0)
    })

    it('should add up dice when there is 4 of a kind', () => {
      const action = { type: TYPES.SET_4_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [2, 1, 1, 1, 1] }, action)
      nextState.scores.fourOfAKind.should.eql(6)
    })

    it('should add up dice when there is 5 of a kind', () => {
      const action = { type: TYPES.SET_4_OF_A_KIND }
      const nextState = reducer({ ...initialState, dice: [1, 1, 1, 1, 1] }, action)
      nextState.scores.fourOfAKind.should.eql(5)
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
  })

  describe('SET_FULL_HOUSE', () => {
    it('should set 0 if it is not a full house', () => {
      const action = { type: TYPES.SET_FULL_HOUSE }
      const nextState = reducer({ ...initialState, dice: [2, 2, 2, 5, 6] }, action)
      nextState.scores.fullHouse.should.eql(0)
    })

    it('should set score to 25 for a full house', () => {
      const action = { type: TYPES.SET_FULL_HOUSE }
      const nextState = reducer({ ...initialState, dice: [2, 1, 1, 2, 1] }, action)
      nextState.scores.fullHouse.should.eql(25)
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
  })

  describe('SET_SMALL_STRAIGHT', () => {
    it('should set 0 if it is not a small straight', () => {
      const action = { type: TYPES.SET_SMALL_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 5, 6] }, action)
      nextState.scores.smallStraight.should.eql(0)
    })

    it('should set score to 30 for a small straight', () => {
      const action = { type: TYPES.SET_SMALL_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 2, 4] }, action)
      nextState.scores.smallStraight.should.eql(30)
    })

    it('should allow a large straight for a small straight', () => {
      const action = { type: TYPES.SET_SMALL_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [5, 1, 3, 2, 4] }, action)
      nextState.scores.smallStraight.should.eql(30)
    })

    it('should allow for a mid small straight', () => {
      const action = { type: TYPES.SET_SMALL_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [5, 2, 3, 2, 4] }, action)
      nextState.scores.smallStraight.should.eql(30)
    })

    it('should allow for a high small straight', () => {
      const action = { type: TYPES.SET_SMALL_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [5, 6, 3, 1, 4] }, action)
      nextState.scores.smallStraight.should.eql(30)
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
  })

  describe('SET_LARGE_STRAIGHT', () => {
    it('should set 0 if it is not a large straight', () => {
      const action = { type: TYPES.SET_LARGE_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 5, 6] }, action)
      nextState.scores.largeStraight.should.eql(0)
    })

    it('should set score to 40 for a large straight', () => {
      const action = { type: TYPES.SET_LARGE_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 5, 4] }, action)
      nextState.scores.largeStraight.should.eql(40)
    })

    it('should allow for a lower large straight', () => {
      const action = { type: TYPES.SET_LARGE_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [5, 1, 3, 2, 4] }, action)
      nextState.scores.largeStraight.should.eql(40)
    })

    it('should allow for a high large straight', () => {
      const action = { type: TYPES.SET_LARGE_STRAIGHT }
      const nextState = reducer({ ...initialState, dice: [5, 6, 3, 2, 4] }, action)
      nextState.scores.largeStraight.should.eql(40)
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
  })

  describe('SET_DINKZEE', () => {
    it('should set 0 if it is not a dinkzee', () => {
      const action = { type: TYPES.SET_DINKZEE }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 5, 6] }, action)
      nextState.scores.dinkzee.should.eql(0)
    })

    it('should set score to 50 for a dinkzee', () => {
      const action = { type: TYPES.SET_DINKZEE }
      const nextState = reducer({ ...initialState, dice: [4, 4, 4, 4, 4] }, action)
      nextState.scores.dinkzee.should.eql(50)
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
  })

  describe('SET_CHANCE', () => {
    it('should add up dice', () => {
      const action = { type: TYPES.SET_CHANCE }
      const nextState = reducer({ ...initialState, dice: [2, 1, 3, 2, 1] }, action)
      nextState.scores.chance.should.eql(9)
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
