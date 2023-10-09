import React from 'react';

const ViewMenu = ({}) => {
    return (
        <div id="ViewDropdown" className="dropdown">
            <button className="dropButton">View</button>
            <div id="ViewDropdownContent" className="dropdownContent">
                <button className="innerDropButton">Toggle Light Mode</button>
            </div>
        </div>
    );
}

export default ViewMenu;