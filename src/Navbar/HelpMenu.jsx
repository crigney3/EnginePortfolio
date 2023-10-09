import React from 'react';

const HelpMenu = ({}) => {
    return (
        <div id="HelpDropdown" className="dropdown">
            <button className="dropButton">Help</button>
            <div id="HelpDropdownContent" className="dropdownContent">
                <button className="innerDropButton">Help!</button>
            </div>
        </div>
    );
}

export default HelpMenu;