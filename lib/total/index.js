import React from 'react'
import styleable from 'react-styleable'

import css from './index.css'

const { number, string } = React.PropTypes

export function Total (props) {
  return (
    <div className={props.css.container}>
      <div className={props.css.label}>{props.label}</div>
      <div className={props.css.value}>{props.value}</div>
    </div>
  )
}
Total.propTypes = {
  label: string,
  value: number
}
Total.defaultProps = {
  label: '',
  value: 0
}

export default styleable(css)(Total)
