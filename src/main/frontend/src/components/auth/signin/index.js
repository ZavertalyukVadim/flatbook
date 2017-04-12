import React, {Component} from "react";
import {connect} from "react-redux";
import {noop} from "lodash";
import Input from "../../input";
import Button, {ButtonSizes, ButtonTypes} from "../../button";
import Header from "../../header";
import "../auth.scss";
import {signin} from "../../../actions/user-actions";

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onInputChange = val => e => this.setState({[val]: e.target.value});
    onLinkClick = () => this.props.redirect('/signup');
    onSubmit = () => {

        const body = {
            grant_type: 'password',
            username: 'hello@gmail.com',
            password: 'password'
        };

        const searchParams = Object.keys(body).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
        }).join('&');

        const POST_CONFIG = {
            method: 'POST', credentials: "omit", mode: 'cors', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0'
            }
        };
        fetch('http://localhost:8080/oauth/token', {
            ...POST_CONFIG,
            body: searchParams
        }).then(
            r => {
                console.log(r.json())
            }
        )
    };

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
            </div>
        );
    }
}

export default connect(({signin}) => ({user: {...signin}}), {signin})(SignIn);
