import React, {Component} from 'react';
import GridExample from './grid-example';
import Input, {inputValidationStateTypes} from '../input';
import Checkbox from '../checkbox';
import Button, {ButtonTypes, ButtonSizes} from '../button';
import Textarea from '../textarea';
import Image, {ImageSizes} from '../image';
import Avatar from '../avatar';

export default class Showroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'wwewe',
            checked: false
        };
    }

    onInputChange = e => this.setState({value: e.target.value});
    onCheckboxClick = () => this.setState({checked: !this.state.checked});

    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <Textarea value={this.state.value} onChange={this.onInputChange}/>
                <Input placeholder="input" type="text" value={this.state.value} onChange={this.onInputChange}/>
                <Input placeholder="error" type="text" value={this.state.value} onChange={this.onInputChange}
                       validationState={inputValidationStateTypes.error} errorMessage="Error message..."
                />
                <Input placeholder="success" type="text" value={this.state.value} onChange={this.onInputChange}
                       validationState={inputValidationStateTypes.success}
                />
                <Input placeholder="disabled" type="text" value={this.state.value} onChange={this.onInputChange}
                       disabled={true}
                />
                <Checkbox onClick={this.onCheckboxClick} checked={this.state.checked} disabled={false}>
                    Label </Checkbox>
                <Checkbox onClick={this.onCheckboxClick} checked={this.state.checked} disabled={true}>
                    Disabled </Checkbox>
                <GridExample/>
                    <Button type={ButtonTypes.primary}
                            size={ButtonSizes.large}
                            caption="Primary Button"
                    />
                    <Button
                        type={ButtonTypes.success}
                        size={ButtonSizes.large}
                        caption="Success Button"
                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.large}
                        caption="Danger Button"
                    />
                    <Button
                        type={ButtonTypes.info}
                        size={ButtonSizes.large}
                        caption="Info Button"
                    />
                    <Button
                        type={ButtonTypes.success}
                        size={ButtonSizes.large}
                        caption="Large"
                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.medium}
                        caption="Medium"
                    />
                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.small}
                        caption="Small"
                    />
                    <Button
                        size={ButtonSizes.medium}
                        disabled={true}
                        caption="Disabled button"
                    />
                    <Image
                        size={ImageSizes.small}
                        src="http://www.pnas.org/site/misc/images/16-01910.500.jpg"
                    />
                    <Avatar
                        src="http://www.pnas.org/site/misc/images/16-01910.500.jpg"
                    />
            </div>
        );
    }
}
