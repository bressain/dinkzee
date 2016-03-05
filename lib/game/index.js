import { connect } from 'react-redux'
import React from 'react'
import styleable from 'react-styleable'

import * as actions from './actions'
import css from './index.css'
import Dice from '../dice'
import Score from '../score'
import Total from '../total'

const { func, object } = React.PropTypes

function mapStateToProps (state) {
  return { game: state.game }
}

function mapDispatchToProps (dispatch) {
  return {
    onUpperValueClicked: selected => {
      dispatch(actions.setUpperValue(selected))
    },
    onDiceRoll: () => {
      dispatch(actions.rollDice())
    },
    onHoldDie: die => {
      dispatch(actions.holdDie(die))
    }
  }
}

function Game (props) {
  return (
    <div className={props.css.container}>
      <div className={props.css.scores}>
        <div>
          <h2>Upper Section</h2>
          <Score label={'Aces'} onValueClicked={props.onUpperValueClicked.bind(null, 'aces')} value={props.game.scores.aces} />
          <Score label={'Twos'} onValueClicked={props.onUpperValueClicked.bind(null, 'twos')} value={props.game.scores.twos} />
          <Score label={'Threes'} onValueClicked={props.onUpperValueClicked.bind(null, 'threes')} value={props.game.scores.threes} />
          <Score label={'Fours'} onValueClicked={props.onUpperValueClicked.bind(null, 'fours')} value={props.game.scores.fours} />
          <Score label={'Fives'} onValueClicked={props.onUpperValueClicked.bind(null, 'fives')} value={props.game.scores.fives} />
          <Score label={'Sixes'} onValueClicked={props.onUpperValueClicked.bind(null, 'sixes')} value={props.game.scores.sixes} />
          <Total label={'Sub Total'} value={props.game.scores.upperSubTotal} />
          <Total label={'Bonus'} value={props.game.scores.upperBonus} />
          <Total label={'Upper Total'} value={props.game.scores.upperTotal} />
        </div>
      </div>
      <div className={props.css.dice}>
        <Dice dice={props.game.dice} held={props.game.held} onDiceRoll={props.onDiceRoll} onHoldDie={props.onHoldDie} />
      </div>
    </div>
  )
}
Game.propTypes = {
  game: object.isRequired,
  onDiceRoll: func.isRequired,
  onHoldDie: func.isRequired,
  onUpperValueClicked: func.isRequired
}
const StyledGame = styleable(css)(Game)
export default connect(mapStateToProps, mapDispatchToProps)(StyledGame)
