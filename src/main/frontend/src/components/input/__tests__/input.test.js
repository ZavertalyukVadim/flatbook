import React from 'react';
import {mount} from 'enzyme';

import Input from '../index';

describe('Input', () => {

    it('value should changed', () => {
        let inputValue;
        const callback = jest.fn(e => {
            inputValue = e.target.value;
        });

        const wrapper = mount(
            <Input disabled={false} onChange={callback} value="value"/>
        );

        wrapper.find('input').simulate('change', {target: {value: 'test'}});
        expect(inputValue).toEqual('test');
    });

    it('value shouldn\'t changed', () => {
        const callback = jest.fn();

        const wrapper = mount(
            <Input disabled={true} onChange={callback} value="value"/>
        );

        const input = wrapper.find('input');

        input.simulate('change', {target: {value: 'test'}});

        expect(input.node.value).not.toEqual('test');
    });

});
