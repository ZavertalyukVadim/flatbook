import React from 'react';
import {mount} from 'enzyme';

import Input from '../index';

describe('Input', () => {

    it('onChange function should be called', () => {
        const callback = jest.fn();

        const wrapper = mount(
            <Input disabled={false} onChange={callback}/>
        );

        wrapper.find('input').simulate('change', {target: {value: 'test'}});
        expect(callback).toHaveBeenCalled();
    });

});
