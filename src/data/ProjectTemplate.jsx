import React, {
  useState, useEffect, useRef, cloneElement, useMemo,
} from 'react';
import propTypes from 'prop-types';
import ReactDOM from 'react-dom/client';

const ProjectTemplate = ({
  initialTitle,
  initialDescription,
  initialShortDescription,
  initialTheme,
  initialFontColor,
  initialImage,
  initialVideo,
  initialCoauthors
}) => {

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [shortDescription, setShortDescription] = useState(initialShortDescription);
  const [theme, setTheme] = useState(initialTheme);
  const [fontColor, setFontColor] = useState(initialFontColor);
  const [image, setImage] = useState(initialImage);
  const [video, setVideo] = useState(initialVideo);
  const [coauthors, setCoauthors] = useState(initialCoauthors);

  return (
    <div className="project">
      <div id='backgroundArea' className={theme}>
        {(title !== null) &&
        <h1 id="title" className={fontColor}>{title}</h1>
        }

        {(image !== null) &&
        <img src={image} alt={shortDescription} className="image"/>
        }

        {(description !== null) &&
        <p id="fullDescription" className={fontColor}>{description}</p>
        }

        {(coauthors !== null) &&
        <p id="coAuthors" className={fontColor}>{coauthors}</p>
        }

        {(video !== null) &&
        <video className="video"><source src={video} /></video>
        }
      </div>
    </div>
  );
}

ProjectTemplate.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  shortDescription: propTypes.string,
  theme: propTypes.string,
  fontColor: propTypes.string,
  image: propTypes.string,
  video: propTypes.string,
  coauthors: propTypes.string
};

ProjectTemplate.defaultProps = {
  title: null,
  description: null,
  shortDescription: null,
  theme: null,
  fontColor: null,
  image: null,
  video: null,
  coauthors: null
};

export default ProjectTemplate;