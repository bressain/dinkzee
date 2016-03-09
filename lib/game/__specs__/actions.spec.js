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

  describe('/set3OfAKind', () => {
    it('should create SET_3_OF_A_KIND action', () => {
      actions.set3OfAKind().should.eql({ type: TYPES.SET_3_OF_A_KIND })
    })
  })

  describe('/set4OfAKind', () => {
    it('should create SET_4_OF_A_KIND action', () => {
      actions.set4OfAKind().should.eql({ type: TYPES.SET_4_OF_A_KIND })
    })
  })

  describe('/setFullHouse', () => {
    it('should create SET_FULL_HOUSE action', () => {
      actions.setFullHouse().should.eql({ type: TYPES.SET_FULL_HOUSE })
    })
  })

  describe('/setSmallStraight', () => {
    it('should create SET_SMALL_STRAIGHT action', () => {
      actions.setSmallStraight().should.eql({ type: TYPES.SET_SMALL_STRAIGHT })
    })
  })

  describe('/setLargeStraight', () => {
    it('should create SET_LARGE_STRAIGHT action', () => {
      actions.setLargeStraight().should.eql({ type: TYPES.SET_LARGE_STRAIGHT })
    })
  })

  describe('/setDinkzee', () => {
    it('should create SET_DINKZEE action', () => {
      actions.setDinkzee().should.eql({ type: TYPES.SET_DINKZEE })
    })
  })

  describe('/setChance', () => {
    it('should create SET_CHANCE action', () => {
      actions.setChance().should.eql({ type: TYPES.SET_CHANCE })
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
