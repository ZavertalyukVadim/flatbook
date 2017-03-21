import React, {Component} from 'react';
import GridExample from './grid-example';
import Input from '../input';
import Checkbox from '../checkbox';
import Button from '../button';
import Textarea from '../textarea';
import Image from '../image';
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
                       validationState="error" errorMessage="Error message..."
                />
                <Input placeholder="success" type="text" value={this.state.value} onChange={this.onInputChange}
                       validationState="success"
                />
                <Input placeholder="success" type="text" value={this.state.value} onChange={this.onInputChange}
                       disabled={true}
                />
                <Checkbox onClick={this.onCheckboxClick} checked={this.state.checked} disabled={false}>
                    Label </Checkbox>
                <Checkbox onClick={this.onCheckboxClick} checked={this.state.checked} disabled={true}>
                    Disabled </Checkbox>
                <GridExample/>
                    <Button
                        type="btn-primary"
                        size="large"
                        children="Primary Button"
                    />
                    <Button
                        type="btn-success"
                        size="large"
                        children="Success Button"
                    />
                    <Button
                        type="btn-danger"
                        size="large"
                        children="Danger Button"
                    />
                    <Button
                        type="btn-info"
                        size="large"
                        children="Info Button"
                    />
                    <Button
                        type="btn-success"
                        size="large"
                        children="Large"
                    />
                    <Button
                        type="btn-danger"
                        size="medium"
                        children="Medium"
                    />
                    <Button
                        type="btn-primary"
                        size="small"
                        children="Small"
                    />
                    <Button
                        size="medium"
                        children="Disabled"
                        disabled={true}
                    />
                    <Image
                        size="small"
                        src="http://www.pnas.org/site/misc/images/16-01910.500.jpg"
                    />
                    <Avatar
                        src="http://www.pnas.org/site/misc/images/16-01910.500.jpg"
                    />
            </div>
        );
    }
}
