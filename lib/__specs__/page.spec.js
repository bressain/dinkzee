import TestUtils from 'react-addons-test-utils'
import React from 'react'
import ReactDom from 'react-dom'

import Page from '../page'

describe('page', () => {
  it('renders', () => {
    const node = TestUtils.renderIntoDocument(React.createElement(Page, {}))
    ReactDom.findDOMNode(node).should.exist
  })
})
