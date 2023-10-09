import React from 'react';
import './Navbar.scss'
import AddMenu from './AddMenu';
import FileMenu from './FileMenu';
import EditMenu from './EditMenu';
import HelpMenu from './HelpMenu';
import ViewMenu from './ViewMenu';

const Navbar = ({}) => {
    return(
        <div className="navbar">
            <FileMenu />
            <EditMenu />
            <AddMenu />
            <ViewMenu />
            <HelpMenu />
        </div>
    );
}

export default Navbar;