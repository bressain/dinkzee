import * as actions from '../actions'
import TYPES from '../types'

describe('game/actions', () => {
  describe('/setUpperValue', () => {
    it('should create SET_UPPER_VALUE action', () => {
      const expected = {
        type: TYPES.SET_UPPER_VALUE,
        selected: 'threes'
      }
      actions.setUpperValue('threes').should.eql(expected)
    })
  })

  describe('/rollDice', () => {
    it('should create ROLL_DICE action', () => {
      const expected = {
        type: TYPES.ROLL_DICE,
        held: [0, 3, 4]
      }
      actions.rollDice([0, 3, 4]).should.eql(expected)
    })
  })
})
