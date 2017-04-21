import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteAnnouncement, changeUserAnnouncementVisibility} from '../../../actions/user-actions';
import Checkbox from '../../checkbox';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import './announcement-control.scss';
import AnnouncementPreview from '../announcement-preview';
import {redirect} from "../../../utils/history";

class AnnouncementControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: !props.visibility
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visibility !== this.props.hidden) {
            this.setState({
                hidden: !nextProps.visibility
            })
        }
    }

    onChangeAnnouncementVisibility = () => {
        this.setState({hidden: !this.state.hidden});
        this.props.changeUserAnnouncementVisibility(this.props.id);
    };
    onDeleteAnnouncement = () => this.props.deleteAnnouncement(this.props.id);
    onEditAnnouncement = () => redirect(`/announcement/${this.props.id}/edit`);
    onMore = () => redirect(`/announcement/${this.props.id}`);

    render() {
        const {
            hidden
        } = this.state;
    
        return (
            <div className="announcement-item">
                <AnnouncementPreview {...this.props}/>
                <div className="announcement-buttons">
                    <Checkbox
                        className="hide-announcement"
                        onClick={this.onChangeAnnouncementVisibility}
                        checked={hidden}
                        disabled={false}
                    >Hide</Checkbox>
                    <Button
                        type={ButtonTypes.info}
                        size={ButtonSizes.small}
                        caption="Show more"
                        onClick={this.onMore}
                    />
                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.small}
                        caption="Edit"
                        onClick={this.onEditAnnouncement}
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
