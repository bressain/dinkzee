import autobind from 'autobind-decorator'
import React from 'react'
import styleable from 'react-styleable'

import css from './index.css'

const { arrayOf, func, number } = React.PropTypes

function handleHoldDie (onHoldDie, idx) {
  if (onHoldDie)
    onHoldDie(idx)
}

function renderDie ({css, held, onHoldDie}, dieValue, idx) {
  const classNames = held.includes(idx) ? `${css.die} ${css.held}` : css.die
  return (
    <button className={classNames}
            key={idx}
            onClick={handleHoldDie.bind(null, onHoldDie, idx)}>{dieValue}</button>
  )
}

function renderDice (props) {
  return props.dice.map((x, i) => renderDie(props, x, i))
}

export function Dice (props) {
  return (
    <div className={props.css.container}>
      <div className={props.css.dice}>
        {renderDice(props)}
      </div>
      <button className={props.css.rollBtn} onClick={props.onDiceRoll}>Roll</button>
    </div>
  )
}
Dice.propTypes = {
  dice: arrayOf(number),
  held: arrayOf(number),
  onDiceRoll: func,
  onHoldDie: func
}
Dice.defaultProps = {
  dice: [0, 0, 0, 0, 0],
  held: []
}

const StyledDice = styleable(css)(Dice)

@autobind
export default class DiceContainer extends React.Component {
  state = { held: [] };
  static propTypes = {
    dice: arrayOf(number),
    onDiceRoll: func
  };
  handleRollClicked () {
    if (this.props.onDiceRoll)
      this.props.onDiceRoll(this.state.held)
  }
  handleHoldDie (dieIdx) {
    let held = [...this.state.held]
    if (held.includes(dieIdx))
      held.splice(held.indexOf(dieIdx), 1)
    else
      held.push(dieIdx)
    this.setState({ held })
  }
  render () {
    return (<StyledDice dice={this.props.dice}
                        held={this.state.held}
                        onDiceRoll={this.handleRollClicked}
                        onHoldDie={this.handleHoldDie}/>)
  }
}
