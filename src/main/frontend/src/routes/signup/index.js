import React, {Component} from 'react';
import Input from '../../components/input';
import Button, {ButtonTypes, ButtonSizes} from '../../components/button';
import Checkbox from '../../components/checkbox';
import Header from '../../components/header';
import './signup.scss';
import {noop} from 'lodash';

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
                    value="Sign up"
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
                    type="password"
                    value={password}
                    onChange={this.onInputChange('password')}
                />
                <Input
                    placeholder="Confirm password"
                    type="password"
                    value={confirmPass}
                    onChange={this.onInputChange('confirmPass')}
                />
                <span className="registration-item">or</span>
                <Button
                    type={ButtonTypes.info}
                    size={ButtonSizes.block}
                    onClick={noop}
                    caption={[<i className="fa fa-facebook registration-icon"/>, 'Sign up with Facebook']}
                />
                <Button
                    type={ButtonTypes.danger}
                    size={ButtonSizes.block}
                    onClick={noop}
                    caption={[<i className="fa fa-google registration-icon"/>, 'Sign up with Google']}
                />
                <div className="row">
                    <Checkbox
                        onClick={this.onCheckboxClick}
                        checked={checked}
                        disabled={false}
                    >
                        <p className="registration-terms">By signing up, I agree with <a href="#">Terms of Service,
                            Nondiscrimination Policy, Payments Terms of Service,
                            Privacy Policy, Guest Refund Policy</a> and <a href="#">Host Guarantee Terms</a>
                        </p>
                    </Checkbox>
                </div>
                <Button
                    type={ButtonTypes.primary}
                    size={ButtonSizes.block}
                    onClick={noop}
                    caption="Sign up"

                />
                <div className="row">
                    <div className="col-6">
                        <p className="account">Already have an account?</p>
                    </div>
                    <div className="col-6">
                        <Button
                            type={ButtonTypes.info}
                            size={ButtonSizes.block}
                            onClick={noop}
                            caption="Sign in"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
