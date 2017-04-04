import React, {Component} from 'react';
import Input from '../input';
import Header, {HeaderTypes} from '../header';
import Button, {ButtonTypes, ButtonSizes} from '../button';
import './profile-settings.scss';
import Checkbox from '../checkbox';

class ProfileSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            firstName: props.firstName,
            lastName: props.lastName,
            phones: props.phones,
            emails: props.emails,
            notifications: false
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


    renderInputs = name =>
        <div>
            {this.state[name].map((item, index) =>
                <div key={index}>
                    <Input
                        placeholder={name}
                        value={item.value}
                        onChange={this.onArrayChange(name, index)}
                    />
                    <Button
                        type={ButtonTypes.info}
                        size={ButtonSizes.small}
                        caption="Delete"
                        onClick={this.handleRemoveInput(name, index)}
                    />
                </div>
            )}
            <Button
                type={ButtonTypes.info}
                size={ButtonSizes.small}
                caption="Add more"
                onClick={this.addNewInput(name)}
            />
        </div>;


    render() {
        return (
            <div className="profile-settings">
                <Header
                    type={HeaderTypes.primary}
                    value="Profile Settings"
                />
                <Input
                    type="text"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onInputChange('email')}
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

                <Button
                    onClick={this.onChangePassword}
                    type={ButtonTypes.info}
                    size={ButtonSizes.block}
                    caption="Change Password"
                />
                <div className="contact-info">
                    <Header
                        type={HeaderTypes.primary}
                        value="Contact Info"
                    />
                    {this.renderInputs('phones')}

                    {this.renderInputs('emails')}
                    <Checkbox
                        checked={this.state.notifications}
                        onClick={this.onCheckboxClick}>
                        Send me notifications from this site
                    </Checkbox>
                    <Button
                        type={ButtonTypes.info}
                        size={ButtonSizes.medium}
                        caption="Save"
                        onClick={this.onChangePassword}
                    />
                </div>
            </div>
        );
    }
}

let phones = [
    {value: ' 3800000001'},
    {value: ' 3800000002'}

];

let emails = [
    {value: 'juliakukuliak@gmail.com1'},
    {value: 'juliakukuliak@gmail.com2'}

];

ProfileSettings.defaultProps = {
    phones: phones,
    emails: emails
};

export default ProfileSettings;
