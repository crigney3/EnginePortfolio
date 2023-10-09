import React from 'react';

const FileMenu = ({}) => {
    return (
    <div id="FileDropdown" className="dropdown">
        <button className="dropButton">File</button>
        <div id="FileDropdownContent" className="dropdownContent">
            <button className="innerDropButton">New</button>
        </div>
    </div>
    );
}

export default FileMenu;