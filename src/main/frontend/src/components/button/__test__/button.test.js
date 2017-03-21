import React from 'react';
import {mount} from 'enzyme';
import Button from '../index';

describe('Button', () => {
    it('button should not be clickable', () => {
        const spy = jest.fn();
        const wrapper = mount(
          <Button onClick={spy} disabled={true}/>
      );
        wrapper.find('.btn-default').simulate('click');
        expect(spy).not.toHaveBeenCalled();
    });

    it('button should clicked', () => {
        const spy = jest.fn();
        const wrapper = mount(
          <Button onClick={spy} disabled={false}/>
      );
        wrapper.find('.btn-default').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
});
