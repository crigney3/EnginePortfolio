import React, {
    useState, useEffect, useRef, useContext, useMemo
} from 'react';
import propTypes from 'prop-types';
import projectData from '../../data/ProjectData.json'

const DetailsWindow = ({}) => {

    const [currentObject, setCurrentObject] = useState(null);
    const [titlesArray, setTitlesArray] = useState(["null"]);
    const [descriptionArray, setDescArray] = useState(["null"]);
    const [shortDescArray, setShortDescArray] = useState(["null"]);
    const [themeArray, setThemeArray] = useState(["null"]);
    const [imagesArray, setImagesArray] = useState(["null"]);
    const [coauthorsArray, setCoauthorsArray] = useState(["null"]);
    const [videoArray, setVideoArray] = useState(["null"]);


    const getTitlesFromData = () => {
        const newTitlesArray = projectData["projects"].map((project) => {
            return project["title"];
        });

        setTitlesArray(newTitlesArray);
    }

    const getDescriptionsFromData = () => {
        const newDescArray = projectData["projects"].map((project) => {
            return project["description"];
        });

        setDescArray(newDescArray);
    }

    const getShortDescFromData = () => {
        const newShortDescArray = projectData["projects"].map((project) => {
            return project["shortDescription"];
        });

        setShortDescArray(newShortDescArray);
    }

    const getThemeFromData = () => {
        const newThemeArray = projectData["projects"].map((project) => {
            return project["theme"];
        });

        setThemeArray(newThemeArray);
    }

    const getImagesFromData = () => {
        // This is terrifying and wrong, fix this
        const newImagesArray = projectData["projects"].map((project) => {
            return project["images"].map((image) => {
                return image;
            });
        });

        setImagesArray(newImagesArray);
    }

    const getVideoFromData = () => {
        const newVideoArray = projectData["projects"].map((project) => {
            return project["video"];
        });

        setVideoArray(newVideoArray);
    }

    const getCoauthorsFromData = () => {
        const newCoauthorsArray = projectData["projects"].map((project) => {
            return project["coauthors"];
        });

        setCoauthorsArray(newCoauthorsArray);
    }

    useMemo(() => { 
        getTitlesFromData();
        getDescriptionsFromData();
        getShortDescFromData();
        getThemeFromData();
        getImagesFromData();
        getVideoFromData();
        getCoauthorsFromData();
    }, []);  

    return (
        <div className="DetailsPanel">
            <h1>Object Details</h1>
            <div className='EditingElements'>
                <label>Current title:</label>
                <select className='TitleDropdown' id="titles">
                    {titlesArray.map( (titleData) => (titleData !== "") && <option key={titleData}>{titleData}</option>)}
                </select>
                <br></br>
                <label>Current description:</label>
                <select className="DescriptionDropdown" id="desc">
                    {descriptionArray.map( (descData) => (descData !== "") && <option key={descData}>{descData}</option>)}
                </select>
                <br></br>
                <label>Current short description:</label>
                <select className="ShortDescriptionDropdown" id="shortDesc">
                    {shortDescArray.map( (shortDescData) => (shortDescData !== "") && <option key={shortDescData}>{shortDescData}</option>)}
                </select>
                <br></br>
                <label>Current theme:</label>
                <select className="ThemeDropdown" id="theme">
                    {themeArray.map( (themeData) => (themeData !== "") && <option key={themeData}>{themeData}</option>)}
                </select>
                <br></br>
                <label>Current image:</label>
                <select className="ImagesDropdown" id="imageDrop">
                    {imagesArray.map( (imagesData) => (imagesData.name !== "") && <option key={imagesData.name}>{imagesData.name}</option>)}
                </select>
                <br></br>
                <label>Current video:</label>
                <select className="VideoDropdown" id="videoDrop">
                    {videoArray.map( (videoData) => (videoData.name !== "") && <option key={videoData.name}>{videoData.name}</option>)}
                </select>
                <br></br>
                <label>Listed Coauthors:</label>
                <select className="CoauthorsDropdown" id="coauthorsDrop">
                    {coauthorsArray.map( (coauthData) => (coauthData !== "") && <option key={coauthData}>{coauthData}</option>)}
                </select>
            </div>
        </div>
    );
}

export default DetailsWindow;