import React, {
    useState, useEffect, useRef, useContext, useMemo
} from 'react';
import propTypes from 'prop-types';
import projectData from '../../data/ProjectData.json'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import WindowControlContext from '../WindowControlContext';

const DetailsWindow = ({
    initialActiveObject
}) => {

    const windowContext = useContext(WindowControlContext);

    // const [currentObject, setCurrentObject] = useState(initialActiveObject);
    // const currentObjectRef = useRef(currentObject);
    const [titlesArray, setTitlesArray] = useState(["null"]);
    const [descriptionArray, setDescArray] = useState(["null"]);
    const [shortDescArray, setShortDescArray] = useState(["null"]);
    const [themeArray, setThemeArray] = useState(["null"]);
    const [imagesArray, setImagesArray] = useState(["null"]);
    const [coauthorsArray, setCoauthorsArray] = useState(["null"]);
    const [videoArray, setVideoArray] = useState(["null"]);

    const [currentTitle, setCurrentTitle] = useState(null);
    const [currentDescription, setCurrentDescription] = useState(null);
    const [currentShortDesc, setCurrentShortDesc] = useState(null);
    const [currentTheme, setCurrentTheme] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentCoauthor, setCurrentCoauthor] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);

    const [isTitleLoading, setIsTitleLoading] = useState(false);
    const [isDescLoading, setIsDescLoading] = useState(false);
    const [isShortDescLoading, setIsShortDescLoading] = useState(false);
    const [isThemeLoading, setIsThemeLoading] = useState(false);
    const [isImagesLoading, setIsImageLoading] = useState(false);
    const [isCoauthLoading, setIsCoauthLoading] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    const getTitlesFromData = () => {
        const newTitlesArray = projectData["projects"].map((project) => {
            return { value: project["title"] };
        });

        setTitlesArray(newTitlesArray);
        setCurrentTitle(newTitlesArray[0]);
        
    }

    const getDescriptionsFromData = () => {
        const newDescArray = projectData["projects"].map((project) => {
            return { value: project["description"] };
        });

        setDescArray(newDescArray);
    }

    const getShortDescFromData = () => {
        const newShortDescArray = projectData["projects"].map((project) => {
            return { value: project["shortDescription"] };
        });

        setShortDescArray(newShortDescArray);
    }

    const getThemeFromData = () => {
        const newThemeArray = projectData["projects"].map((project) => {
            return { value: project["theme"]};
        });

        setThemeArray(newThemeArray);
    }

    const getImagesFromData = () => {
        // hooray for array.flat()!
        const newImagesArray = projectData["projects"].map((project) => {
            let subImagesArray = project["images"].map((imageObj) => {
                return { value: imageObj.name, label: imageObj.name, image: imageObj.src };
            });
            
            return subImagesArray;
        });

        const flattenedImagesArray = newImagesArray.flat();

        setImagesArray(flattenedImagesArray);
    }

    const getVideoFromData = () => {
        const newVideoArray = projectData["projects"].map((project) => {
            return { value: project["video"].name, src: project["video"].src };
        });

        setVideoArray(newVideoArray);
    }

    const getCoauthorsFromData = () => {
        const newCoauthorsArray = projectData["projects"].map((project) => {
            let subCoauthorsArray = project["coauthors"].map((coauthorObj) => {
                return { value: coauthorObj.name, github: coauthorObj.github };
            })
            
            return subCoauthorsArray;
        });

        const flattenedCoauthorsArray = newCoauthorsArray.flat();

        setCoauthorsArray(flattenedCoauthorsArray);
    }

    const createTextOnlyOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
      });

    const handleTitleCreate = (inputValue) => {
        setIsTitleLoading(true);
        setTimeout(() => {
            const newOption = createTextOnlyOption(inputValue);
            setIsTitleLoading(false);
            setTitlesArray((prev) => [...prev, newOption]);
            setCurrentTitle(newOption);
        }, 1000);
    }

    const handleDescriptionCreate = (inputValue) => {
        setIsDescLoading(true);
        setTimeout(() => {
            const newOption = createTextOnlyOption(inputValue);
            setIsDescLoading(false);
            setDescArray((prev) => [...prev, newOption]);
            setCurrentDescription(newOption);
        }, 1000);
    }

    const handleShortDescriptionCreate = (inputValue) => {
        setIsShortDescLoading(true);
        setTimeout(() => {
            const newOption = createTextOnlyOption(inputValue);
            setIsShortDescLoading(false);
            setShortDescArray((prev) => [...prev, newOption]);
            setCurrentShortDesc(newOption);
        }, 1000);
    }

    const handleThemeCreate = (inputValue) => {
        setIsThemeLoading(true);
        setTimeout(() => {
            const newOption = createTextOnlyOption(inputValue);
            setIsThemeLoading(false);
            setThemeArray((prev) => [...prev, newOption]);
            setCurrentTheme(newOption);
        }, 1000);
    }

    const handleImageCreate = (inputValue) => {
        setIsImageLoading(true);
        setTimeout(() => {
            // TODO: make option creator for images? Or make these not creatable
            const newOption = createTextOnlyOption(inputValue);
            setIsImagesLoading(false);
            setImageArray((prev) => [...prev, newOption]);
            setCurrentImage(newOption);
        }, 1000);
    }

    const handleVideoCreate = (inputValue) => {
        setIsVideoLoading(true);
        setTimeout(() => {
            const newOption = createTextOnlyOption(inputValue);
            setIsVideoLoading(false);
            setVideoArray((prev) => [...prev, newOption]);
            setCurrentVideo(newOption);
        }, 1000);
    }

    const handleCoauthoCreate = (inputValue) => {
        setIsCoauthLoading(true);
        setTimeout(() => {
            // TODO: make option creator for coauth? Or make these not creatable
            const newOption = createTextOnlyOption(inputValue);
            setIsCoauthLoading(false);
            setCoauthArray((prev) => [...prev, newOption]);
            setCurrentCoauth(newOption);
        }, 1000);
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
            <span>{windowContext.activeObject}</span>
            <div className='EditingElements'>
                <label>Current title:</label>
                <CreatableSelect
                    isClearable
                    defaultValue={titlesArray[0]}
                    className='titlesSelector'
                    name='editorTitles'
                    options={titlesArray}
                    isDisabled={isTitleLoading}
                    isLoading={isTitleLoading}
                    onCreateOption={handleTitleCreate}
                    value={currentTitle}
                    onChange={(newValue) => setCurrentTitle(newValue)}
                    formatOptionLabel={titleObj => (
                        (titleObj.value !== "") &&
                        <div className="titleOption">
                          <span>{titleObj.value}</span>
                        </div>
                    )}
                />
                <br></br>
                <label>Current description:</label>
                <CreatableSelect
                    isClearable
                    defaultValue={descriptionArray[0]}
                    className='descriptionSelector'
                    name='editorDescs'
                    options={descriptionArray}
                    isDisabled={isDescLoading}
                    isLoading={isDescLoading}
                    onCreateOption={handleDescriptionCreate}
                    value={currentDescription}
                    onChange={(newValue) => setCurrentDescription(newValue)}
                    formatOptionLabel={descObj => (
                        (descObj.value !== "") &&
                        <div className="descOption">
                          <span>{descObj.value}</span>
                        </div>
                    )}
                />
                <br></br>
                <label>Current short description:</label>
                <CreatableSelect
                    isClearable
                    defaultValue={shortDescArray[0]}
                    className='shortDescSelector'
                    name='editorShortDesc'
                    isDisabled={isShortDescLoading}
                    isLoading={isShortDescLoading}
                    onCreateOption={handleShortDescriptionCreate}
                    options={shortDescArray}
                    onChange={(newValue) => setCurrentShortDescription(newValue)}
                    formatOptionLabel={shortDescObj => (
                        (shortDescObj.value !== "") &&
                        <div className="shortDescOption">
                          <span>{shortDescObj.value}</span>
                        </div>
                    )}
                />
                <br></br>
                <label>Current theme:</label>
                <Select
                    defaultValue={themeArray[0]}
                    className='themeSelector'
                    name='editorTitles'
                    options={themeArray}
                    formatOptionLabel={themeObj => (
                        (themeObj.value !== "") &&
                        <div className="themeOption">
                          <span>{themeObj.value}</span>
                        </div>
                    )}
                />
                <br></br>
                <label>Current image:</label>
                <Select 
                    defaultValue={imagesArray[0]}
                    name="editorImages"
                    className='imagesSelector'
                    options={imagesArray}
                    formatOptionLabel={imageObj => (
                      (imageObj.value !== "") &&
                      <div className="imageOption">
                        <img src={imageObj.image} alt={imageObj.value} />
                        <span>{imageObj.value}</span>
                      </div>
                    )}
                />
                <br></br>
                <label>Current video:</label>
                <Select
                    defaultValue={videoArray[0]}
                    className='videoSelector'
                    name='editorTitles'
                    options={videoArray}
                    formatOptionLabel={videoObj => (
                        (videoObj.value !== "") &&
                        <div className="videoOption">
                          <span>{videoObj.value}</span>
                        </div>
                    )}
                />
                <br></br>
                <label>Listed Coauthors:</label>
                <Select 
                    defaultValue={coauthorsArray[0]}
                    isMulti
                    name="editorCoauthors"
                    options={coauthorsArray}
                    className='coauthorsSelector'
                    formatOptionLabel={coAuthObj => (
                      (coAuthObj.value !== "") &&
                      <div className="coauthOption">
                        <span>{coAuthObj.value}</span>
                        <a href={"https://github.com/" + coAuthObj.github}>{coAuthObj.github}</a>
                      </div>
                    )}
                />
            </div>
        </div>
    );
}

export default DetailsWindow;