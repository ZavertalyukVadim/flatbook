import React, {Component} from 'react';
import {connect} from 'react-redux';
import {noop} from 'lodash';
import Input from '../../components/input';
import Button, {ButtonTypes, ButtonSizes} from '../../components/button';
import Header from '../../components/header';
import './signin.scss';
import {signin} from '../../actions/user-actions';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onInputChange = val => e => this.setState({[val]: e.target.value});
    // onSubmit = () => this.props.signin({email: this.state.email, password: this.state.password});

    render() {
        const {
            email,
            password
        } = this.state;

        const {
            user: {
                logged
            }
        } = this.props;

        if (logged) {
            return <div className="col-12" style={{textAlign: 'center'}}><Header type="primary" value="You are logged"/></div>;
        }

        return (
            <div className="col-4 offset-4 signin-form">
                <Header
                    type="primary"
                    value="Sign In"
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
                <span className="signin-item">or</span>
                <Button
                    type={ButtonTypes.info}
                    size={ButtonSizes.block}
                    caption={[<i className="fa fa-facebook signin-icon"/>, 'Sign in with Facebook']}
                    onClick={noop}
                />
                <Button
                    type={ButtonTypes.danger}
                    size={ButtonSizes.block}
                    caption={[<i className="fa fa-google signin-icon"/>, 'Sign in with Google']}
                    onClick={noop}
                />
                <Button
                    type={ButtonTypes.primary}
                    size={ButtonSizes.block}
                    caption="Sign In"
                    onClick={noop}
                />
                <div className="row">
                    <div className="col-6">
                        <p className="account">Don't have an account?</p>
                    </div>
                    <div className="col-6">
                        <Button
                            type={ButtonTypes.info}
                            size={ButtonSizes.block}
                            caption="Sign Up"
                            onClick={noop}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

SignIn = connect(({signin}) => ({user: {...signin}}), {signin})(SignIn);

export default SignIn;
