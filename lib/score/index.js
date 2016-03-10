import React from 'react'
import styleable from 'react-styleable'

import css from './index.css'

const { bool, func, number, shape, string } = React.PropTypes

function handleValueClicked (props) {
  if (props.onValueClicked)
    props.onValueClicked()
}

function renderScore (score) {
  return score.scored ? score.value : ''
}

export function Score (props) {
  return (
    <div className={props.css.container}>
      <div className={props.css.label}>{props.label}</div>
      <button className={props.css.value}
              onClick={handleValueClicked.bind(null, props)}>
        {renderScore(props.score)}
      </button>
    </div>
  )
}
Score.propTypes = {
  label: string,
  onValueClicked: func,
  score: shape({
    scored: bool,
    value: number
  })
}
Score.defaultProps = {
  label: '',
  score: { scored: false, value: 0 }
}

export default styleable(css)(Score)
