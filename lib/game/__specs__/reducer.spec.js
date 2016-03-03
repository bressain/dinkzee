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
    })

    it('sets dice to zeros', () => {
      const dice = reducer().dice
      dice.should.eql([0, 0, 0, 0, 0])
    })

    it('sets throws to 0', () => {
      reducer().throwsLeft.should.eql(3)
    })
  })

  describe('SET_UPPER_VALUE', () => {
    it('should set 0 if no selected dice are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'aces' }
      const nextState = reducer({ dice: [2, 3, 4, 5, 6] }, action)
      nextState.scores.aces.should.eql(0)
    })

    it('should add up aces that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'aces' }
      const nextState = reducer({ dice: [2, 1, 1, 3, 1] }, action)
      nextState.scores.aces.should.eql(3)
    })

    it('should add up twos that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'twos' }
      const nextState = reducer({ dice: [2, 1, 2, 3, 6] }, action)
      nextState.scores.twos.should.eql(4)
    })

    it('should add up threes that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'threes' }
      const nextState = reducer({ dice: [3, 3, 2, 3, 6] }, action)
      nextState.scores.threes.should.eql(9)
    })

    it('should add up fours that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'fours' }
      const nextState = reducer({ dice: [4, 3, 4, 4, 4] }, action)
      nextState.scores.fours.should.eql(16)
    })

    it('should add up fives that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'fives' }
      const nextState = reducer({ dice: [5, 5, 5, 5, 5] }, action)
      nextState.scores.fives.should.eql(25)
    })

    it('should add up sixes that are held', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'sixes' }
      const nextState = reducer({ dice: [4, 6, 5, 1, 3] }, action)
      nextState.scores.sixes.should.eql(6)
    })

    it('should reset throws after scoring', () => {
      const action = { type: TYPES.SET_UPPER_VALUE, selected: 'sixes' }
      const nextState = reducer({ dice: [4, 6, 5, 1, 3], throwsLeft: 0 }, action)
      nextState.throwsLeft.should.eql(initialState.throwsLeft)
    })
  })

  describe('ROLL_DICE', () => {
    it('should randomize all dice', () => {
      const nextState = reducer(initialState, { type: TYPES.ROLL_DICE })
      nextState.dice.forEach(x => x.should.not.eql(0))
    })

    it('should not roll dice that are held', () => {
      const nextState = reducer({ dice: [0, 0, 3, 0, 5] }, { type: TYPES.ROLL_DICE, held: [2, 4] })
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
})
