import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

class ProjectTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: null,
            shortDescription: null,
            theme: null,
            fontColor: null,
            image: null,
            video: null,
            coauthors: null
        }
    }
    
    render() {
        return (
          <div className="project">
            <div id='backgroundArea' className={this.state.theme}>
              {(this.state.title !== null) &&
              <h1 id="title" className={this.state.fontColor}>{this.state.title}</h1>
              }
  
              {(this.state.image !== null) &&
              <img src={this.state.image} alt={this.state.shortDescription} className="image"/>
              }
  
              {(this.state.description !== null) &&
              <p id="fullDescription" className={this.state.fontColor}>{this.state.description}</p>
              }
  
              {(this.state.coauthors !== null) &&
              <p id="coAuthors" className={this.state.fontColor}>{this.state.coauthors}</p>
              }
  
              {(this.state.video !== null) &&
              <video className="video"><source src={this.state.video} /></video>
              }
            </div>
          </div>
        )
    }
}

export default ProjectTemplate;