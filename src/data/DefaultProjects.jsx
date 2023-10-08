import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectTemplate from "./ProjectTemplate";
import projectData from './ProjectData.json';

const SHOEProject = ({}) => {
    return(
        <ProjectTemplate 
        initialTitle={projectData["projects"][0].title}
        initialDescription={projectData["projects"][0].description}
        initialShortDescription={projectData["projects"][0].shortDescription}
        initialCoauthors={projectData["projects"][0].coAuthors}
        initialImage={projectData["projects"][0].image}
        initialVideo={projectData["projects"][0].video}
        initialTheme={projectData["projects"][0].theme}
        initialFontColor={projectData["projects"][0].fontColor}
        />
    )
}

const MCSProject = ({}) => {
    return(
        <ProjectTemplate 
        initialTitle={projectData["projects"][1].title}
        initialDescription={projectData["projects"][1].description}
        initialShortDescription={projectData["projects"][1].shortDescription}
        initialCoauthors={projectData["projects"][1].coAuthors}
        initialImage={projectData["projects"][1].image}
        initialVideo={projectData["projects"][1].video}
        initialTheme={projectData["projects"][1].theme}
        initialFontColor={projectData["projects"][1].fontColor}
        />
    )
}

const UnrealLIDARProject = ({}) => {
    return(
        <ProjectTemplate 
        initialTitle={projectData["projects"][2].title}
        initialDescription={projectData["projects"][2].description}
        initialShortDescription={projectData["projects"][2].shortDescription}
        initialCoauthors={projectData["projects"][2].coAuthors}
        initialImage={projectData["projects"][2].image}
        initialVideo={projectData["projects"][2].video}
        initialTheme={projectData["projects"][2].theme}
        initialFontColor={projectData["projects"][2].fontColor}
        />
    )
}

const ThisWebsiteProject = ({}) => {
    return(
        <ProjectTemplate 
        initialTitle={projectData["projects"][3].title}
        initialDescription={projectData["projects"][3].description}
        initialShortDescription={projectData["projects"][3].shortDescription}
        initialCoauthors={projectData["projects"][3].coAuthors}
        initialImage={projectData["projects"][3].image}
        initialVideo={projectData["projects"][3].video}
        initialTheme={projectData["projects"][3].theme}
        initialFontColor={projectData["projects"][3].fontColor}
        />
    )
}

export {
    SHOEProject,
    MCSProject,
    UnrealLIDARProject,
    ThisWebsiteProject
}