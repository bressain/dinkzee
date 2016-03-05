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
        type: TYPES.ROLL_DICE
      }
      actions.rollDice().should.eql(expected)
    })
  })

  describe('/holdDie', () => {
    it('should create HOLD_DIE action', () => {
      const expected = {
        type: TYPES.HOLD_DIE,
        die: 3
      }
      actions.holdDie(3).should.eql(expected)
    })
  })
})
