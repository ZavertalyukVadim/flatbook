import React, {Component} from 'react';
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

    onCheckboxClick = () => this.setState({visibility: !this.state.visibility});

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
                        onClick={this.onCheckboxClick}
                        checked={visibility}
                        disabled={false}
                    >Hide</Checkbox>

                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.small}
                        caption="Edit"

                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.small}
                        caption="Delete"
                    />
                </div>
            </div>
        )
    }
}

export default  AnnouncementControl;
