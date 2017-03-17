import React from 'react';
import {mount} from 'enzyme';

import Textarea from '../index';

describe('Textarea', () => {

    it('value should changed', () => {
        let inputValue;
        const callback = jest.fn(e => {
            inputValue = e.target.value;
        });

        const wrapper = mount(
            <Textarea disabled={false} onChange={callback} value="value"/>
        );

        wrapper.find('textarea').simulate('change', {target: {value: 'test'}});
        expect(inputValue).toEqual('test');
    });

    it('value shouldn\'t changed', () => {
        const callback = jest.fn();

        const wrapper = mount(
            <Textarea disabled={true} onChange={callback} value="value"/>
        );

        const textarea = wrapper.find('textarea');

        textarea.simulate('change', {target: {value: 'test'}});

        expect(textarea.node.value).not.toEqual('test');
    });

});
