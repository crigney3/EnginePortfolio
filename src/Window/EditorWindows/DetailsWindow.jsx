import React, {
    useState, useEffect, useRef, useContext, useMemo
} from 'react';
import propTypes from 'prop-types';
import projectData from '../../data/ProjectData.json'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const DetailsWindow = ({}) => {

    const [currentObject, setCurrentObject] = useState(null);
    const currentObjectRef = useRef(null);
    const [titlesArray, setTitlesArray] = useState(["null"]);
    const [descriptionArray, setDescArray] = useState(["null"]);
    const [shortDescArray, setShortDescArray] = useState(["null"]);
    const [themeArray, setThemeArray] = useState(["null"]);
    const [imagesArray, setImagesArray] = useState(["null"]);
    const [coauthorsArray, setCoauthorsArray] = useState(["null"]);
    const [videoArray, setVideoArray] = useState(["null"]);

    const [currentTitle, setCurrentTitle] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createTextOnlyOption(inputValue);
            setIsLoading(false);
            setTitlesArray((prev) => [...prev, newOption]);
            setCurrentTitle(newOption);
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
            <div className='EditingElements'>
                <label>Current title:</label>
                <CreatableSelect
                    isClearable
                    defaultValue={titlesArray[0]}
                    className='titlesSelector'
                    name='editorTitles'
                    options={titlesArray}
                    isDisabled={isLoading}
                    isLoading={isLoading}
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
                <Select
                    defaultValue={descriptionArray[0]}
                    className='descriptionSelector'
                    name='editorTitles'
                    options={descriptionArray}
                    formatOptionLabel={descObj => (
                        (descObj.value !== "") &&
                        <div className="descOption">
                          <span>{descObj.value}</span>
                        </div>
                    )}
                />
                <br></br>
                <label>Current short description:</label>
                <Select
                    defaultValue={shortDescArray[0]}
                    className='shortDescSelector'
                    name='editorTitles'
                    options={shortDescArray}
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