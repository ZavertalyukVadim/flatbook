import React from 'react';
import Container from '../../../components/container';
import Sidebar from '../../../components/profile/sidebar';
import ProfileSettings from '../../../components/profile/profile-settings';

const Settings = () => {
    return (
        <Container
            sidebar={
                <Sidebar/>
            }
        >
            <div className="profile-settings-wrapper">
                <ProfileSettings/>
            </div>

        </Container>
    );
};

export default Settings;
