import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectTemplate from "./ProjectTemplate";

// class DefaultProjects extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {


//         return (
//             <div className="allDefaultProjects">
//                 <ProjectTemplate />
//             </div>
//         )
//     }
// }

class SHOEProject extends ProjectTemplate {
    constructor(props) {
        super(props);

        this.state.title = "SHOE";
        this.state.description = "It's the Sorta Helpful Open Engine!";
        this.state.backgroundColor = null;
        this.state.fontColor = null;
        this.state.video = null;
        this.state.image = null;
        this.state.shortDescription = null;
        this.state.coauthors = null;
    }
}

class MinecraftCharityStream extends ProjectTemplate {
    constructor(props) {
        super(props);
        
        this.state.title = "The Minecraft Charity Stream";
        this.state.description = null;
        this.state.backgroundColor = null;
        this.state.fontColor = null;
        this.state.video = null;
        this.state.image = null;
        this.state.shortDescription = null;
        this.state.coauthors = null;
    }
}

class UnrealLIDAR extends ProjectTemplate {
    constructor(props) {
        super(props);
        
        this.state.title = "Unreal LIDAR";
        this.state.description = null;
        this.state.backgroundColor = null;
        this.state.fontColor = null;
        this.state.video = null;
        this.state.image = null;
        this.state.shortDescription = null;
        this.state.coauthors = null;
    }
}

class ThisWebsite extends ProjectTemplate {
    constructor(props) {
        super(props);
        
        this.state.title = "This Website";
        this.state.description = null;
        this.state.backgroundColor = null;
        this.state.fontColor = null;
        this.state.video = null;
        this.state.image = null;
        this.state.shortDescription = null;
        this.state.coauthors = null;
    }
}

export {
    SHOEProject,
    MinecraftCharityStream,
    UnrealLIDAR,
    ThisWebsite
}

// export function SHOEProject() {
//     let SHOETemplate = new ProjectTemplate();

//     SHOETemplate.setState({title: "SHOE"});
//     SHOETemplate.setState({description: "It's the Sorta Helpful Open Engine!"});

//     return (
//         SHOETemplate
//     );
// }