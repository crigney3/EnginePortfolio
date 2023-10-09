import React from 'react';

const EditMenu = ({}) => {
    return (
    <div id="EditDropdown" className="dropdown">
        <button className="dropButton">Edit</button>
        <div id="EditDropdownContent" className="dropdownContent">
            <button className="innerDropButton">Copy</button>
        </div>
    </div>
    );
}

export default EditMenu;