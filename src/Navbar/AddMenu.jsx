import React from 'react';

const AddMenu = ({}) => {
    return (
    <div id="AddDropdown" className="dropdown">
        <button className="dropButton">Add</button>
        <div id="AddDropdownContent" className="dropdownContent">
            <button className="innerDropButton">Project</button>
        </div>
    </div>
    );
}

export default AddMenu;