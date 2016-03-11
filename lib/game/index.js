import autobind from 'autobind-decorator'
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
    setUpperValue: selected => {
      dispatch(actions.setUpperValue(selected))
    },
    set3OfAKind: () => {
      dispatch(actions.set3OfAKind())
    },
    set4OfAKind: () => {
      dispatch(actions.set4OfAKind())
    },
    setFullHouse: () => {
      dispatch(actions.setFullHouse())
    },
    setSmallStraight: () => {
      dispatch(actions.setSmallStraight())
    },
    setLargeStraight: () => {
      dispatch(actions.setLargeStraight())
    },
    setDinkzee: () => {
      dispatch(actions.setDinkzee())
    },
    setChance: () => {
      dispatch(actions.setChance())
    },
    rollDice: () => {
      dispatch(actions.rollDice())
    },
    holdDie: die => {
      dispatch(actions.holdDie(die))
    }
  }
}

@autobind
@styleable(css)
class Game extends React.Component {
  static propTypes = {
    game: object.isRequired,
    rollDice: func.isRequired,
    holdDie: func.isRequired,
    set3OfAKind: func.isRequired,
    set4OfAKind: func.isRequired,
    setChance: func.isRequired,
    setDinkzee: func.isRequired,
    setFullHouse: func.isRequired,
    setLargeStraight: func.isRequired,
    setSmallStraight: func.isRequired,
    setUpperValue: func.isRequired
  };
  handleSetUpperValue (selected) {
    this.props.setUpperValue(selected)
  }
  render () {
    return (
      <div className={this.props.css.container}>
        <div className={this.props.css.scores}>
          <div className={this.props.css.upperSection}>
            <h2>Upper Section</h2>
            <Score label={'Aces'} onValueClicked={() => this.handleSetUpperValue('aces')} score={this.props.game.scores.aces} />
            <Score label={'Twos'} onValueClicked={() => this.handleSetUpperValue('twos')} score={this.props.game.scores.twos} />
            <Score label={'Threes'} onValueClicked={() => this.handleSetUpperValue('threes')} score={this.props.game.scores.threes} />
            <Score label={'Fours'} onValueClicked={() => this.handleSetUpperValue('fours')} score={this.props.game.scores.fours} />
            <Score label={'Fives'} onValueClicked={() => this.handleSetUpperValue('fives')} score={this.props.game.scores.fives} />
            <Score label={'Sixes'} onValueClicked={() => this.handleSetUpperValue('sixes')} score={this.props.game.scores.sixes} />
            <Total label={'Sub Total'} value={this.props.game.scores.upperSubTotal} />
            <Total label={'Bonus'} value={this.props.game.scores.upperBonus} />
            <Total label={'Upper Total'} value={this.props.game.scores.upperTotal} />
          </div>
          <div className={this.props.css.lowerSection}>
            <h2>Lower Section</h2>
            <Score label={'3 of a kind'} onValueClicked={this.props.set3OfAKind} score={this.props.game.scores.threeOfAKind} />
            <Score label={'4 of a kind'} onValueClicked={this.props.set4OfAKind} score={this.props.game.scores.fourOfAKind} />
            <Score label={'Full House'} onValueClicked={this.props.setFullHouse} score={this.props.game.scores.fullHouse} />
            <Score label={'Small Straight'} onValueClicked={this.props.setSmallStraight} score={this.props.game.scores.smallStraight} />
            <Score label={'Large Straight'} onValueClicked={this.props.setLargeStraight} score={this.props.game.scores.largeStraight} />
            <Score label={'Dinkzee'} onValueClicked={this.props.setDinkzee} score={this.props.game.scores.dinkzee} />
            <Score label={'Chance'} onValueClicked={this.props.setChance} score={this.props.game.scores.chance} />
            <Total label={'Dinkzee Bonus'} value={this.props.game.scores.dinkzeeBonus} />
            <Total label={'Lower Total'} value={this.props.game.scores.lowerTotal} />
            <Total label={'Grand Total'} value={this.props.game.scores.grandTotal} />
          </div>
        </div>
        <div className={this.props.css.dice}>
          <Dice dice={this.props.game.dice} held={this.props.game.held} onDiceRoll={this.props.rollDice} onHoldDie={this.props.holdDie} />
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game)
