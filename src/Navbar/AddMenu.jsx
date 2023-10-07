import React from 'react';
import ReactDOM from 'react-dom/client';

class AddMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="AddDropdown" className="dropdown">
            <button className="dropButton">Add</button>
            <div id="AddDropdownContent" className="dropdownContent">
                <button className="innerDropButton">Project</button>
            </div>
        </div>
        );
    }
}

export default AddMenu;