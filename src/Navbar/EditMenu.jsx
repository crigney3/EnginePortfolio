import React from 'react';
import ReactDOM from 'react-dom/client';

class EditMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="EditDropdown" className="dropdown">
            <button className="dropButton">Edit</button>
            <div id="EditDropdownContent" className="dropdownContent">
                <button className="innerDropButton">Copy</button>
            </div>
        </div>
        );
    }
}

export default EditMenu;