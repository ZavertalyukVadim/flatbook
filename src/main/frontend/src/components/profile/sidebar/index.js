import React from 'react';
import AvatarContainer from '../../avatar-container';
import {Link} from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => {
    return (
        <div className="profile-sidebar">
            <AvatarContainer/>
            <ul className="profile-sidebar-links">
                <li>
                    <Link to='/profile'>
                        <div>Announcements<i className="sidebar-links-icon fa fa-pencil-square-o"/></div>
                    </Link>
                </li>
                <li>
                    <Link to='/profile/settings'>
                        <div>Settings <i className="sidebar-links-icon fa fa-user-o"/></div>
                    </Link>
                </li>
                <li>
                    <Link to='/profile/messages'>
                        <div>Messages <i className="sidebar-links-icon fa fa-envelope-o"/></div>
                    </Link>
                </li>
                <li>
                    <Link to='/profile/favourite'>
                        <div> Favourite <i className="sidebar-links-icon fa fa-heart-o"/>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to='/profile/booking'>
                        <div> Bookings <i className="sidebar-links-icon fa fa-heart-o"/>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
