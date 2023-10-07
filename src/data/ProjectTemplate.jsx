import React from 'react';
import ReactDOM from 'react-dom/client';

class ProjectTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: null,
            shortDescription: null,
            backgroundColor: null,
            fontColor: null,
            image: null,
            video: null,
            coauthors: null
        }
    }
    
    render() {
        return (
          <div className="project">
            {(this.state.title !== null) &&
            <h1 className="title">{this.state.title}</h1>
            }

            {(this.state.image !== null) &&
            <img src={this.state.image} alt={this.state.shortDescription} className="image"/>
            }

            {(this.state.description !== null) &&
            <p className="fullDescription">{this.state.description}</p>
            }

            {(this.state.coauthors !== null) &&
            <p className="coAuthors">{this.state.coauthors}</p>
            }

            {(this.state.video !== null) &&
            <video className="video"><source src={this.state.video} /></video>
            }
          </div>
        )
    }
}

export default ProjectTemplate;