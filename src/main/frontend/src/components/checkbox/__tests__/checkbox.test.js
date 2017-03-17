import React from 'react';
import {mount} from 'enzyme';

import Checkbox from '../index';

describe('Checkbox', () => {

    it('onClick function should be called', () => {
        const callback = jest.fn();

        const wrapper = mount(
            <Checkbox disabled={false} onClick={callback}/>
        );

        wrapper.find('.checkbox').simulate('click');
        expect(callback).toHaveBeenCalled();
    });

    it('onClick function shouldn\'t be called', () => {
        const callback = jest.fn();

        const wrapper = mount(
            <Checkbox disabled={true} onClick={callback}/>
        );

        wrapper.find('.checkbox').simulate('click');
        expect(callback).not.toHaveBeenCalled();
    });

});
