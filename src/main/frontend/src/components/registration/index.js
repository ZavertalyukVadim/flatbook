import React, {Component} from 'react';
import Input from '../input';
import Button, {ButtonTypes, ButtonSizes} from '../button';
import Checkbox from '../checkbox';
import Header from '../header';
import './registration.scss';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPass: '',
            checked: false
        };
    }

    onCheckboxClick = () => this.setState({checked: !this.state.checked});
    onInputChange = val => e => this.setState({[val]: e.target.value});

    render() {

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPass,
            checked
        } = this.state;

        return (
            <div className="col-4 offset-4 registration-form">
                <Header
                    type="primary"
                    value="Registration"
                />
                <Input
                    placeholder="First name"
                    type="text"
                    value={firstName}
                    onChange={this.onInputChange('firstName')}
                />

                <Input
                    placeholder="Last name"
                    type="text"
                    value={lastName}
                    onChange={this.onInputChange('lastName')}
                />

                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={this.onInputChange('email')}
                />

                <Input
                    placeholder="Password"
                    type="text"
                    value={password}
                    onChange={this.onInputChange('password')}
                />

                <Input
                    placeholder="Confirm password"
                    type="text"
                    value={confirmPass}
                    onChange={this.onInputChange('confirmPass')}
                />
                <span className="registration-item">or</span>
                <Button
                    type={ButtonTypes.info}
                    size={ButtonSizes.block}
                    caption={[<i className="fa fa-facebook registration-icon"/>, "Register with Facebook"]}
                />

                <Button
                    type={ButtonTypes.danger}
                    size={ButtonSizes.block}
                    caption={[<i className="fa fa-google registration-icon"/>, "Register with Google"]}
                />
                <div className="row">
                    <div className="col-2">
                        <Checkbox
                            onClick={this.onCheckboxClick}
                            checked={checked}
                            disabled={false}>
                        </Checkbox>
                    </div>
                    <div className="col-10">
                        <p className="registration-terms">By signing up, I agree with <a href="#">Terms of Service,
                            Nondiscrimination Policy, Payments Terms of Service,
                            Privacy Policy, Guest Refund Policy</a> and <a href="#">Host Guarantee Terms</a></p>
                    </div>
                </div>
                <Button
                    type={ButtonTypes.primary}
                    size={ButtonSizes.block}
                    caption="Register"
                    onClick={this.onSubmit}
                />
                <div className="row">
                    <div className="col-6">
                        <p className="account">Already have an account?</p>
                    </div>
                    <div className="col-6">
                        <Button
                            type={ButtonTypes.info}
                            size={ButtonSizes.block}
                            caption="Log in"
                        />
                    </div>
                </div>
            </div>

        )
    }

}