import React from 'react';
import './SideBar.css';
import {Link} from "react-router-dom";

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <Link to='/admin/bikelist'><button className="sidebar-button">Bikelist</button></Link>
            <Link to='/admin/userlist'><button className="sidebar-button">User List</button></Link>
            <Link to='/admin/bikebookinglist'><button className="sidebar-button">Bike Booking List</button></Link>
        </div>
    );
};

export default Sidebar;
