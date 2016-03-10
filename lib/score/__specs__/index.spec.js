import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Score } from '../index'
import css from '../index.css'

describe('<Score />', () => {
  it('renders', () => {
    const css = { label: 'label', value: 'value' }
    const wrapper = shallow(<Score css={css} label='herp' score={{ scored: true, value: 42 }} />)
    wrapper.find('.label').text().should.eql('herp')
    wrapper.find('.value').text().should.eql('42')
  })

  it('renders blank value when not scored', () => {
    const css = { label: 'label', value: 'value' }
    const wrapper = shallow(<Score css={css} label='herp' score={{ scored: false, value: 0 }} />)
    wrapper.find('.value').text().should.eql('')
  })

  it('calls onValueClicked when clicked', () => {
    const onValueClicked = sinon.spy()
    const wrapper = shallow(<Score css={{}} onValueClicked={onValueClicked} />)
    wrapper.find('button').simulate('click')
    onValueClicked.should.have.been.calledOnce
  })
})
