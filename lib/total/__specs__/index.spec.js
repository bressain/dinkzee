import React from 'react'
import { shallow } from 'enzyme'

import { Total } from '../index'
import css from '../index.css'

describe('<Total />', () => {
  it('renders', () => {
    const css = { label: 'label', value: 'value' }
    const wrapper = shallow(<Total css={css} label='herp' value={42} />)
    wrapper.find('.label').text().should.eql('herp')
    wrapper.find('.value').text().should.eql('42')
  })
})
