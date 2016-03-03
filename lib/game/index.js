import { connect } from 'react-redux'
import React from 'react'
import styleable from 'react-styleable'

import * as actions from './actions'
import css from './index.css'
import Score from '../score'

const { func, object } = React.PropTypes

function mapStateToProps (state) {
  return { game: state.game }
}

function mapDispatchToProps (dispatch) {
  return {
    onUpperValueClicked: selected => {
      dispatch(actions.setUpperValue(selected, [1, 2, 3, 4, 5]))
    }
  }
}

function Game (props) {
  return (
    <div className={props.css.container}>
      <div>Upper Section</div>
      <Score label={'Aces'} onValueClicked={() => props.onUpperValueClicked('aces')} value={props.game.scores.aces} />
      <Score label={'Twos'} value={props.game.scores.twos} />
      <Score label={'Threes'} value={props.game.scores.threes} />
      <Score label={'Fours'} value={props.game.scores.fours} />
      <Score label={'Fives'} value={props.game.scores.fives} />
      <Score label={'Sixes'} value={props.game.scores.sixes} />
    </div>
  )
}
Game.propTypes = {
  css: object,
  game: object.isRequired,
  onUpperValueClicked: func.isRequired
}
const StyledGame = styleable(css)(Game)
export default connect(mapStateToProps, mapDispatchToProps)(StyledGame)
