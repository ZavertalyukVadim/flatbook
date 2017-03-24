import React, {Component} from 'react';
import Input from '../../components/input';
import Button, {ButtonTypes, ButtonSizes} from '../../components/button';
import Header from '../../components/header';
import './signin.scss';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onInputChange = val => e => this.setState({[val]: e.target.value});

    render() {

        const {
            email,
            password
        } = this.state;

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
                />
                <Button
                    type={ButtonTypes.danger}
                    size={ButtonSizes.block}
                    caption={[<i className="fa fa-google signin-icon"/>, 'Sign in with Google']}
                />
                <Button
                    type={ButtonTypes.primary}
                    size={ButtonSizes.block}
                    caption="Sign In"
                    onClick={this.onSubmit}
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
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
