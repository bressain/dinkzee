import React from 'react'
import styleable from 'react-styleable'

import css from './index.css'

const { func, number, object, string } = React.PropTypes

function handleValueClicked (props) {
  if (props.onValueClicked)
    props.onValueClicked()
}

export function Score (props) {
  return (
    <div className={props.css.container}>
      <div className={props.css.label}>{props.label}</div>
      <button className={props.css.value} onClick={handleValueClicked.bind(null, props)}>{props.value}</button>
    </div>
  )
}
Score.propTypes = {
  css: object,
  label: string,
  onValueClicked: func,
  value: number
}
Score.defaultProps = {
  label: '',
  value: 0
}

export default styleable(css)(Score)
