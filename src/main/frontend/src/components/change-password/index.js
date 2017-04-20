import React, {Component} from 'react';
import Modal from '../modal';
import Input from '../input';
import Header, {HeaderTypes} from '../header';
import Button, {ButtonSizes, ButtonTypes} from '../button';
import './change-password.scss';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            oldPassword: '',
            newPassword: '',
            confirmation: ''
        };
    }

    onInputChange = name => e => this.setState({[name]: e.target.value});
    openModal = () => this.setState({isModalOpen: true});
    closeModal = () => this.setState({isModalOpen: false});

    render() {
        const {
            oldPassword,
            newPassword,
            confirmation
        } = this.state;
        return (
            <div className="change-password-modal">
                <Modal
                    isOpen={this.state.isModalOpen}
                    close={this.closeModal}
                >
                    <div className="change-password-field">
                        <Header
                            type={HeaderTypes.secondary}
                            value="Change password"
                        />
                        <Input
                            placeholder="Enter old password"
                            type="password"
                            value={oldPassword}
                            onChange={this.onInputChange('oldPassword')}
                        />
                        <Input
                            placeholder="Enter new password"
                            type="password"
                            value={newPassword}
                            onChange={this.onInputChange('newPassword')}
                        />
                        <Input
                            placeholder="Confirm password"
                            type="password"
                            value={confirmation}
                            onChange={this.onInputChange('confirmation')}
                        />
                        <Button
                            type={ButtonTypes.primary}
                            size={ButtonSizes.block}
                            onClick={this.openModal}
                            caption="Change Password"
                        />
                    </div>
                </Modal>
                <Button
                    type={ButtonTypes.primary}
                    size={ButtonSizes.block}
                    onClick={this.openModal}
                    caption="Change Password"
                />
            </div>
        );
    }
}

export default ChangePassword;
