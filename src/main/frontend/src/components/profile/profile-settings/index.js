import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, updateUser} from '../../../actions/user-actions';
import Input from '../../input';
import Header, {HeaderTypes} from '../../header';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import './profile-settings.scss';
import Checkbox from '../../checkbox';
import Loader from '../../loader';
import ChangePassword from '../../change-password';

class ProfileSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.user.data
        };
    }

    componentDidMount() {
        this.props.getUser();
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({...nextProps.user.data});
        }
    }

    onChangePassword = () => console.log(this.state);

    onInputChange = name => e => this.setState({[name]: e.target.value});

    onArrayChange = (name, idx) => e => this.setState({
        [name]: this.state[name].map((item, index) => idx === index ? {value: e.target.value} : item)
    });

    addNewInput = name => () => this.setState({[name]: this.state[name].concat({value: ''})});

    onCheckboxClick = () => this.setState({notifications: !this.state.notifications});

    handleRemoveInput = (name, idx) => () => this.setState({
        [name]: this.state[name].filter((item, index) => idx !== index)
    });

    onSubmit = () => this.props.updateUser(this.state);

    renderInputs = (name, placeholder) =>
        <div>
            <div className="contact-info-header">
                <Header value={placeholder}/>
                <Button
                    type={ButtonTypes.link}
                    caption="Add more"
                    onClick={this.addNewInput(name)}
                />
            </div>
            {this.state[name].map((item, index) =>
                <div key={index} className="contact-info-field">
                    <Input
                        placeholder={placeholder}
                        value={item.content}
                        onChange={this.onArrayChange(name, index)}
                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.medium}
                        caption="Delete"
                        onClick={this.handleRemoveInput(name, index)}
                    />
                </div>
            )}
        </div>;

    render() {
        console.log(this.props.user.loaded);
        return (
            <div className="profile-settings-field">
                {this.props.user.loaded ? (
                    <div className="profile-settings">
                        <Header
                            type={HeaderTypes.primary}
                            value="Profile Settings"
                        />
                        <Input
                            type="text"
                            placeholder="First name"
                            value={this.state.firstName}
                            onChange={this.onInputChange('firstName')}
                        />
                        <Input
                            type="text"
                            placeholder="Last name"
                            value={this.state.lastName}
                            onChange={this.onInputChange('lastName')}
                        />
                        <ChangePassword/>
                        <div className="contact-info">
                            <Header
                                type={HeaderTypes.primary}
                                value="Contact Info"
                            />
                            {this.renderInputs('phones', 'Phone')}

                            {this.renderInputs('emails', 'Email')}
                            <Checkbox
                                checked={this.state.notifications}
                                onClick={this.onCheckboxClick}>
                                Send me notifications from this site
                            </Checkbox>
                            <Button
                                type={ButtonTypes.primary}
                                size={ButtonSizes.block}
                                caption="Save"
                                onClick={this.onSubmit}
                            />
                        </div>
                    </div>) : (<Loader/>)}
            </div>
        );
    }
}

export default connect(({user}) => ({user: user}), {getUser, updateUser})(ProfileSettings);
