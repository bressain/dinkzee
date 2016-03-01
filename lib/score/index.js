import React from 'react'
import styleable from 'react-styleable'

import css from './index.css'

const { func, number, object, string } = React.PropTypes

function handleValueClicked (props) {
  if (props.onValueClicked)
    props.onValueClicked()
}

function Score (props) {
  return (
    <div className={props.css.container}>
      <div className={props.css.label}>{props.label}</div>
      <div className={props.css.value} onClick={handleValueClicked.bind(null, props)}>{props.value}</div>
    </div>
  )
}
Score.propTypes = {
  css: object,
  label: string,
  onValueClicked: func,
  value: number.isRequired
}
Score.defaultProps = {
  label: ''
}

export default styleable(css)(Score)
