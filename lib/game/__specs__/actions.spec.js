import * as actions from '../actions'
import TYPES from '../types'

describe('game/actions', () => {
  describe('/setUpperValue', () => {
    it('should create SET_UPPER_VALUE action', () => {
      const expected = {
        type: TYPES.SET_UPPER_VALUE,
        selected: 'threes',
        dice: [1, 2, 3, 4, 5]
      }
      actions.setUpperValue('threes', [1, 2, 3, 4, 5]).should.eql(expected)
    })
  })
})
