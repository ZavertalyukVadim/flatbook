import React from 'react';
import {mount} from 'enzyme';

import Dropdown from '../index';

describe('Input-range', () => {

    it('dropdown should show correct selected value', () => {
        let selectedID = 1;
        const callback = jest.fn();
        const options = [
            {
                id: 0,
                value: 'option 1'
            }, {
                id: 1,
                value: 'option 2'
            }, {
                id: 2,
                value: 'option 3'
            }
        ];

        const wrapper = mount(
            <Dropdown
                selectedID={selectedID}
                options={options}
                onOptionChange={callback}
            />
        );

        const dropdownSelected = wrapper.find('.dropdown-selected');

        expect(dropdownSelected.text()).toEqual(options.find(o => o.id === selectedID).value);
    });

    it('dropdown should show correct change selected value', () => {
        let selectedID = 1;
        const callback = jest.fn(value => selectedID = value);
        const options = [
            {
                id: 0,
                value: 'option 1'
            }, {
                id: 1,
                value: 'option 2'
            }, {
                id: 2,
                value: 'option 3'
            }
        ];

        const wrapper = mount(
            <Dropdown
                selectedID={selectedID}
                options={options}
                onOptionChange={callback}
            />
        );

        const wrapOptions = wrapper.find('.dropdown-option');

        wrapOptions.first().simulate('click');

        expect(selectedID).toEqual(0);
    });
});
