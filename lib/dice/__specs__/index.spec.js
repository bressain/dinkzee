import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Dice } from '../index'
import css from '../index.css'

describe('<Dice />', () => {
  it('renders', () => {
    const css = { die: 'die' }
    const dice = [1, 2, 3, 4, 5]
    const wrapper = shallow(<Dice css={css} dice={dice} />)
    wrapper.find('.die').should.have.length(5)
    wrapper.find('.die').forEach((x, i) => {
      x.text().should.eql(dice[i].toString())
    })
  })

  it('calls onDiceRoll when roll dice button clicked', () => {
    const onDiceRoll = sinon.spy()
    const css = { rollBtn: 'rollBtn' }
    const wrapper = shallow(<Dice css={css} onDiceRoll={onDiceRoll} />)
    wrapper.find('.rollBtn').simulate('click')
    onDiceRoll.should.have.been.calledOnce
  })

  it('calls onHoldDie when die button clicked', () => {
    const onHoldDie = sinon.spy()
    const css = { die: 'die' }
    const wrapper = shallow(<Dice css={css} onHoldDie={onHoldDie} />)
    wrapper.find('.die').forEach(x => x.simulate('click'))
    onHoldDie.should.have.been.calledWith(0)
    onHoldDie.should.have.been.calledWith(1)
    onHoldDie.should.have.been.calledWith(2)
    onHoldDie.should.have.been.calledWith(3)
    onHoldDie.should.have.been.calledWith(4)
  })

  it('adds held class when a die is held', () => {
    const css = { die: 'die', held: 'held' }
    const wrapper = shallow(<Dice css={css} held={[1, 4]} />)

    wrapper.find('.held').should.have.length(2)
  })
})
