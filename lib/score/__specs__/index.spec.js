import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Score } from '../index'
import css from '../index.css'

describe('<Score />', () => {
  it('renders', () => {
    const css = { label: 'label', value: 'value' }
    const wrapper = shallow(<Score css={css} label='herp' value={42} />)
    wrapper.find('.label').text().should.eql('herp')
    wrapper.find('.value').text().should.eql('42')
  })

  it('calls onValueClicked when clicked', () => {
    const onValueClicked = sinon.spy()
    const wrapper = shallow(<Score css={{}} onValueClicked={onValueClicked} />)
    wrapper.find('button').simulate('click')
    onValueClicked.should.have.been.calledOnce
  })
})
