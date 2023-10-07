import React from 'react';
import ReactDOM from 'react-dom/client';

class HelpMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="HelpDropdown" className="dropdown">
                <button className="dropButton">Help</button>
                <div id="HelpDropdownContent" className="dropdownContent">
                    <button className="innerDropButton">Help!</button>
                </div>
            </div>
        );
    }
}

export default HelpMenu;