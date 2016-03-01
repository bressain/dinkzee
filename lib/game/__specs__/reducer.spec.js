import reducer from '../reducer'
import TYPES from '../types'

describe('game/reducer', () => {
  describe('/initial state', () => {
    it('sets upper section to zeros', () => {
      const state = reducer()
      state.aces.should.eql(0)
      state.twos.should.eql(0)
      state.threes.should.eql(0)
      state.fours.should.eql(0)
      state.fives.should.eql(0)
      state.sixes.should.eql(0)
    })
  })

  describe('SET_UPPER_VALUE', () => {
    it('should set 0 if no selected dice are held', () => {
      const nextState = reducer({}, { type: TYPES.SET_UPPER_VALUE, selected: 'aces', dice: [2, 3, 4, 5, 6] })
      nextState.aces.should.eql(0)
    })

    it('should add up aces that are held', () => {
      const nextState = reducer({}, { type: TYPES.SET_UPPER_VALUE, selected: 'aces', dice: [2, 1, 1, 3, 1] })
      nextState.aces.should.eql(3)
    })

    it('should add up twos that are held', () => {
      const nextState = reducer({}, { type: TYPES.SET_UPPER_VALUE, selected: 'twos', dice: [2, 1, 2, 3, 6] })
      nextState.twos.should.eql(4)
    })

    it('should add up threes that are held', () => {
      const nextState = reducer({}, { type: TYPES.SET_UPPER_VALUE, selected: 'threes', dice: [3, 3, 2, 3, 6] })
      nextState.threes.should.eql(9)
    })

    it('should add up fours that are held', () => {
      const nextState = reducer({}, { type: TYPES.SET_UPPER_VALUE, selected: 'fours', dice: [4, 3, 4, 4, 4] })
      nextState.fours.should.eql(16)
    })

    it('should add up fives that are held', () => {
      const nextState = reducer({}, { type: TYPES.SET_UPPER_VALUE, selected: 'fives', dice: [5, 5, 5, 5, 5] })
      nextState.fives.should.eql(25)
    })

    it('should add up sixes that are held', () => {
      const nextState = reducer({}, { type: TYPES.SET_UPPER_VALUE, selected: 'sixes', dice: [4, 6, 5, 1, 3] })
      nextState.sixes.should.eql(6)
    })
  })
})
