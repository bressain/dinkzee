import React from 'react'
import styleable from 'react-styleable'

import css from './page.css'

@styleable(css)
export default class Page extends React.Component {
  static propTypes = {
    css: React.PropTypes.object
  };
  render () {
    return (
      <div className={this.props.css.ohai}>Ohai!</div>
    )
  }
}
