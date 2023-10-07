import React from 'react';
import ReactDOM from 'react-dom/client';

class ViewMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="ViewDropdown" className="dropdown">
                <button className="dropButton">View</button>
                <div id="ViewDropdownContent" className="dropdownContent">
                    <button className="innerDropButton">Toggle Light Mode</button>
                </div>
            </div>
        );
    }
}

export default ViewMenu;