import React, {Component} from 'react';
import GridExample from '../grid';
import Input from '../input';
import Checkbox from '../checkbox';

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
                <Input placeholder="input" type="text" value={this.state.value} onChange={this.onInputChange}/>
                <Input placeholder="error" type="text" value={this.state.value} onChange={this.onInputChange}
                       validationState="error"
                />
                <Input placeholder="success" type="text" value={this.state.value} onChange={this.onInputChange}
                       validationState="success"
                />
                <Input placeholder="success" type="text" value={this.state.value} onChange={this.onInputChange}
                       disabled={true}
                />
                <Checkbox onClick={this.onCheckboxClick} checked={this.state.checked} disabled={false}>
                    Label </Checkbox>
                <GridExample/>
            </div>
        );
    }
}
