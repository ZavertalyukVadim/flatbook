import React, {Component} from 'react';
import Input from '../../input';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import Checkbox from '../../checkbox';
import Header from '../../header';
import {connect} from 'react-redux';
import {signup} from '../../../actions/user-actions';
import '../auth.scss';
import {noop} from 'lodash';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPass: '',
            checked: false
        };
    }

    onSubmit = () => this.state.confirmPass === this.state.password && this.state.checked
        ? this.props.signup({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emails: [{content: this.state.email, primary: true}],
            phones: [{content: this.state.phone, primary: true}],
            password: this.state.password
        }) : noop();
    onCheckboxClick = () => this.setState({checked: !this.state.checked});
    onInputChange = val => e => this.setState({[val]: e.target.value});
    onLinkClick = () => this.props.redirect('/signin');

    render() {

        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            confirmPass,
            checked
        } = this.state;

        return (
            <div className="auth-form">
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
                    placeholder="Phone"
                    type="text"
                    value={phone}
                    onChange={this.onInputChange('phone')}
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
                <div>
                    <Checkbox
                        onClick={this.onCheckboxClick}
                        checked={checked}
                        disabled={false}
                    >
                        <p>By signing up, I agree with <a href="#">Terms of Service,
                            Nondiscrimination Policy, Payments Terms of Service,
                            Privacy Policy, Guest Refund Policy</a> and <a href="#">Host Guarantee Terms</a>
                        </p>
                    </Checkbox>
                </div>
                <Button
                    type={ButtonTypes.primary}
                    size={ButtonSizes.block}
                    onClick={this.onSubmit}
                    caption="Sign up"
                />
                <span className="auth-item">or</span>
                <div className="auth-social-button-field">
                    <Button
                        type={ButtonTypes.info}
                        size={ButtonSizes.block}
                        onClick={noop}
                        caption={[<i className="fa fa-facebook auth-icon"/>, 'Sign up with Facebook']}
                        className="auth-social-button"
                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.block}
                        onClick={noop}
                        caption={[<i className="fa fa-google auth-icon"/>, 'Sign up with Google']}
                    />
                </div>
                <div className="auth-link">
                    <p className="auth-link-description">Already have an account?</p>
                    <Button
                        type={ButtonTypes.info}
                        size={ButtonSizes.block}
                        onClick={this.onLinkClick}
                        caption="Sign in"
                    />
                </div>
            </div>
        );
    }
}

export default connect(({user}) => ({user: user}), {signup})(SignUp);
