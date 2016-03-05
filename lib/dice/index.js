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

export default styleable(css)(Dice)
