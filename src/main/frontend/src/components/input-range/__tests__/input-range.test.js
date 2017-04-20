import React from 'react';
import {mount} from 'enzyme';

import InputRange from '../index';

describe('Input-range', () => {

    it('value should changed with input', () => {
        let inputValue = 4;
        const callback = jest.fn(value => inputValue = value);

        const wrapper = mount(
            <InputRange value={inputValue} maxValue={10} onChangeValue={callback}/>
        );

        const input = wrapper.find('input');

        input.simulate('focus');
        input.simulate('change', {target: {value: '7'}});
        input.simulate('blur');

        expect(inputValue).toEqual(7);
        expect(callback).toHaveBeenCalled();
    });

    it('left arrow disabled', () => {

        const callback = jest.fn();

        const wrapper = mount(
            <InputRange value={1} maxValue={10} onChangeValue={callback}/>
        );

        wrapper.find('.arrow .arrow-left').simulate('click');

        expect(callback).not.toHaveBeenCalled();
    });

    it('left arrow clicked and changed value', () => {
        let inputValue = 4;
        const callback = jest.fn(value => inputValue = value);

        const wrapper = mount(
            <InputRange value={inputValue} maxValue={10} onChangeValue={callback}/>
        );

        const arrow = wrapper.find('.arrow .arrow-left');

        arrow.simulate('click');

        expect(inputValue).toEqual(3);
        expect(callback).toHaveBeenCalled();
    });

    it('right arrow disabled', () => {

        const callback = jest.fn();

        const wrapper = mount(
            <InputRange value={10} maxValue={10} onChangeValue={callback}/>
        );

        wrapper.find('.arrow .arrow-right').simulate('click');

        expect(callback).not.toHaveBeenCalled();
    });

    it('right arrow clicked and changed value', () => {
        let inputValue = 4;
        const callback = jest.fn(value => inputValue = value);

        const wrapper = mount(
            <InputRange value={inputValue} maxValue={10} onChangeValue={callback}/>
        );

        const arrow = wrapper.find('.arrow .arrow-right');

        arrow.simulate('click');

        expect(inputValue).toEqual(5);
        expect(callback).toHaveBeenCalled();
    });


});
