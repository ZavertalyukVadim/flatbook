import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteAnnouncement, changeUserAnnouncementVisibility} from '../../../actions/user-actions';
import Checkbox from '../../checkbox';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import './announcement-control.scss';
import AnnouncementPreview from '../announcement-preview';

class AnnouncementControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: !props.visibility
        }
    }

    onChangeAnnouncementVisibility = () => {
        this.setState({visibility: !this.state.visibility});
        this.props.changeUserAnnouncementVisibility(this.props.id);
    };
    onDeleteAnnouncement = () => this.props.deleteAnnouncement(this.props.id);

    render() {
        const {
            visibility
        } = this.state;

        return (
            <div className="announcement-item">
                <AnnouncementPreview {...this.props}/>
                <div className="announcement-buttons">
                    <Checkbox
                        className="hide-announcement"
                        onClick={this.onChangeAnnouncementVisibility}
                        checked={visibility}
                        disabled={false}
                    >Hide</Checkbox>
                    <Button
                        type={ButtonTypes.info}
                        size={ButtonSizes.small}
                        caption="Show more"
                    />
                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.small}
                        caption="Edit"
                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.small}
                        caption="Delete"
                        onClick={this.onDeleteAnnouncement}
                    />
                </div>
            </div>
        )
    }
}

export default connect(({user}) => ({user: user}), {
    deleteAnnouncement,
    changeUserAnnouncementVisibility
})(AnnouncementControl);
