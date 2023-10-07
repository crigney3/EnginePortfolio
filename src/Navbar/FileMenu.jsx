import React from 'react';
import ReactDOM from 'react-dom/client';

class FileMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="FileDropdown" className="dropdown">
            <button className="dropButton">File</button>
            <div id="FileDropdownContent" className="dropdownContent">
                <button className="innerDropButton">New</button>
            </div>
        </div>
        );
    }
}

export default FileMenu;