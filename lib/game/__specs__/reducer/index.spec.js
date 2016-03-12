import initialState from '../../reducer/initialState'
import reducer from '../../reducer'
import TYPES from '../../types'

describe('game/reducer', () => {
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
