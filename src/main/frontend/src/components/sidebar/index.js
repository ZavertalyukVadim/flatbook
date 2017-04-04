import React from 'react';
import AvatarContainer from '../avatar-container';
import {Link} from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => {
 return (
     <div className="profile-sidebar">
         <AvatarContainer/>
         <ul className="profile-sidebar-links">
             <li>
                 <Link to='/profile'>
                     Announcements
                 </Link>
                 <i className="sidebar-links-icon fa fa-pencil-square-o"/>
             </li>
             <li>
                 <Link to='/profile/settings'>
                     Settings
                 </Link>
                 <i className="sidebar-links-icon fa fa-user-o"/>
             </li>
             <li>
                 <Link to='/profile/messages'>
                     Messages
                 </Link>
                 <i className="sidebar-links-icon fa fa-envelope-o"/>
             </li>
             <li>
                 <Link to='/profile/favourite'>
                     Favourite
                 </Link>
                 <i className="sidebar-links-icon fa fa-heart-o"/>
             </li>
         </ul>
     </div>
 );
};

export default Sidebar;
