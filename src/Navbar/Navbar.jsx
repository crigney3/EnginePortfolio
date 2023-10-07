import React from 'react';
import './Navbar.css'
import ReactDOM from 'react-dom/client';
import AddMenu from './AddMenu';
import FileMenu from './FileMenu';
import EditMenu from './EditMenu';
import HelpMenu from './HelpMenu';
import ViewMenu from './ViewMenu';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
}

export default Navbar;