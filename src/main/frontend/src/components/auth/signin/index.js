import React, {Component} from "react";
import {connect} from "react-redux";
import {noop} from "lodash";
import Input from "../../input";
import Button, {ButtonSizes, ButtonTypes} from "../../button";
import Header from "../../header";
import "../auth.scss";
import {signin, signInWithFacebook} from "../../../actions/user-actions";
import FacebookLogin from 'react-facebook-login';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    signInWithFB = response => response.status !== 'unknown' ? this.props.signInWithFacebook(response) : noop();
    onInputChange = val => e => this.setState({[val]: e.target.value});
    onLinkClick = () => this.props.redirect('/signup');
    onSubmit = () => this.props.signin({username: this.state.email, password: this.state.password});

    render() {
        const {
            email,
            password
        } = this.state;

        return (
            <div className="auth-form">
                <Header
                    type="primary"
                    value="Sign In"
                />
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={this.onInputChange('email')}
                    name="username"
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={this.onInputChange('password')}
                    name="password"
                />
                <Button
                    type={ButtonTypes.primary}
                    size={ButtonSizes.block}
                    caption="Sign In"
                    onClick={this.onSubmit}
                />
                <span className="auth-item">or</span>
                <div className="auth-social-button-field">
                    <Button
                        type={ButtonTypes.info}
                        size={ButtonSizes.block}
                        caption={[<i className="fa fa-facebook auth-icon"/>, 'Sign in with Facebook']}
                        onClick={noop}
                        className="auth-social-button"
                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.block}
                        caption={[<i className="fa fa-google auth-icon"/>, 'Sign in with Google']}
                        onClick={noop}
                    />
                </div>
                <div className="auth-link">
                    <p className="auth-link-description">Don't have an account?</p>
                    <Button
                        type={ButtonTypes.info}
                        size={ButtonSizes.block}
                        caption="Sign Up"
                        onClick={this.onLinkClick}
                    />
                </div>
                <FacebookLogin
                    appId="1429168600437309"
                    autoLoad={false}
                    fields="name,email"
                    cssClass="info"
                    callback={this.signInWithFB} />
            </div>
        );
    }
}

export default connect(({signin}) => ({user: {...signin}}), {signin, signInWithFacebook})(SignIn);
