import logo from './logo.svg';
import './reset.css';
import './App.scss';
import Engine from './Engine/Engine';
import { SHOEProject, ThisWebsite, MinecraftCharityStream, UnrealLIDAR } from './data/DefaultProjects';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [appHeight, setAppHeight] = useState(document.querySelector('html').offsetHeight);

  useEffect(() => {
    const handleResize = () => {
      setAppHeight(document.querySelector('html').offsetHeight);
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.querySelector('#root').style.height = `${appHeight}px`;
  }, [appHeight]);

  return (
    <>
      <Navbar />
      <Engine width={windowWidth} height={windowHeight} />
    </>    
  );
};

export default App;
