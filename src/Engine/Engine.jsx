// This is the core manager for all windows and subcomponents.
import React, {
    useState, useEffect, useRef, cloneElement, useMemo,
} from 'react';
import propTypes from 'prop-types';
import './Engine.scss';
import { isMobile } from 'react-device-detect';
import Window from '../Window/Window.jsx';
import WindowControlContext from '../Window/WindowControlContext';
import { SHOEProject, MCSProject, UnrealLIDARProject, ThisWebsiteProject } from '../data/DefaultProjects';
import DetailsWindow from '../Window/EditorWindows/DetailsWindow';

const Engine = ({
    width,
    height
}) => {
    // Keep a list of all open windows
    const [openWindows, setOpenWindows] = useState([]);
    const openWindowsRef = useRef(openWindows);

    // Track which window should be in focus
    const [activeWindow, setActiveWindow] = useState(0);
    const activeWindowRef = useRef(activeWindow);
    const [activeWindowPosition, setActiveWindowPosition] = useState({
      x: width / 2,
      y: height / 2,
    });
    const activeWindowPositionRef = useRef(activeWindowPosition);
  
    // Need a stack so that when a window is closed, the next one behind it will be displayed
    const [windowStack, setWindowStack] = useState([]);
    const windowStackRef = useRef(windowStack);

    // Keep a reference to this component
    const engineRef = useRef(null);

    // Modify the array of open windows when a window is closed
    const handleWindowClose = (windowKey) => {
        setOpenWindows(openWindowsRef.current
          .filter((windowElem) => windowElem.props.id !== windowKey));
    };
    
    // Change the active window based on clicks or other actions
    const handleFocus = (windowKey) => {
        const windowIndex = openWindowsRef.current
          .findIndex((windowElem) => windowElem.props.id === windowKey);
        setActiveWindow(windowIndex);
    };

    // Unfocus all other windows when a window is focused
    const handleDefocus = (e) => {
        if ((!e.target.parentElement.className.includes('Engine')) || (e.target.className.includes('Window'))) return;

        document.querySelectorAll('.markActive').forEach((activeMark) => {
          // eslint-disable-next-line no-param-reassign
          activeMark.className = '';
          activeMark.removeAttribute('style');
        });
        setActiveWindow(null);
    };

    // Handle when a new window is opened, and set it active
    const handleWindowOpen = (windowElem) => {
        const windowIndex = openWindowsRef.current
          .findIndex((window) => window.props.id === windowElem.props.id);
    
        if (windowIndex !== -1) {
          setActiveWindow(windowIndex);
          return;
        }
    
        setOpenWindows([...openWindowsRef.current, windowElem]);
    };

    // Z indices determine "depth" - in a 2D plane, that just determines which windows are on top of others
    const getZIndex = (id) => {
        const windowIndex = openWindowsRef.current
          .findIndex((window) => window.props.id === id);
    
        if (windowIndex < 0) return 0;
        return windowStackRef.current.indexOf(windowIndex);
    };

    // Creating a new window should spawn it nearby to the last active window.
    const getNewWindowPosition = () => {
        if (!activeWindowRef.current || !activeWindowRef.current < 0 || isMobile) return {};
        return {
          x: activeWindowPositionRef.current.x + 50,
          y: activeWindowPositionRef.current.y + 50,
        };
    };

    // useEffect is a hook that triggers after a rerender.
    // This arrow function handles ordering the windows on each rerender.
    useEffect(() => {
        if (openWindows.length - 1 >= 0) {
          if (openWindows.length > openWindowsRef.current.length || windowStack.length === 0) {
            setActiveWindow(openWindows.length - 1);
          } else {
            setActiveWindow(windowStack[windowStack.length - 1]);
          }
          openWindows.forEach((_, index) => {
            if (index in windowStack) return;
            windowStackRef.current.push(index);
          });
          setWindowStack([...windowStackRef.current]);
        } else {
          setActiveWindow(null);
          setWindowStack([]);
        }
        openWindowsRef.current = openWindows;
    }, [openWindows]);

    // Similar to above, this arrow function updates Engine's references.
    useEffect(() => {
        activeWindowRef.current = activeWindow;
        windowStackRef.current.splice(windowStackRef.current.indexOf(activeWindowRef.current), 1);
        windowStackRef.current.push(activeWindowRef.current);
        setWindowStack([...windowStackRef.current]);
    }, [activeWindow]);

    // The Position Ref has to be set in a separate useEffect because it's part of a different state var
    useEffect(() => {
        activeWindowPositionRef.current = activeWindowPosition;
    }, [activeWindowPosition]);

    // This hook updates all the states at the base level of the Engine component
    useEffect(() => {
        // Set some initial transform values before dealing with resizing and mobile
        let landingInitialTransform = {
          w: 500,
          h: 250,
          x: (width / 2) - 450,
          y: (height / 2) - 100,
        };
        let imageInitialTransform = {
          w: 300,
          h: 355,
          x: (width / 2) + 70,
          y: (height / 2) - 175,
        };
    
        // Change those initial transforms for mobile depending on vertical vs. horizontal    
        if (isMobile && width < height) {
            landingInitialTransform = {
            ...landingInitialTransform,
            x: 12.5,
            y: (height / 2) - 300,
            };
            imageInitialTransform = {
            ...imageInitialTransform,
            x: (width / 2) - 150,
            y: (height / 2) - 25,
            };
        } else if (isMobile) {
            landingInitialTransform = {
            ...landingInitialTransform,
            x: 12.5,
            y: (height / 2) - (Math.min(height - 25, 250) / 2),
            };
            imageInitialTransform = {
            ...imageInitialTransform,
            x: (width / 2) + 100,
            y: (height / 2) - (Math.min(height - 25, 355) / 2),
            };
        }
    
        // What windows should exist and be open by default?
        setOpenWindows([
              <Window
                windowName="DetailsPanel"
                className="DetailsPanel"
                id="DetailsPanel"
                handleWindowClose={handleWindowClose}
                handleFocus={handleFocus}
                initialTransform={imageInitialTransform}
                iconSrc={null}
                key="DetailsPanel"
                index={-1}
              > 
                <DetailsWindow />
              </Window>, 
              <Window
                windowName="SHOE-Project-Window"
                className="Landing"
                id="SHOE-Project-Window"
                handleWindowClose={handleWindowClose}
                handleFocus={handleFocus}
                initialTransform={imageInitialTransform}
                iconSrc={null}
                key="SHOE-Project-Window"
                index={-1}
              >
                <SHOEProject />
              </Window>,
              <Window
                windowName="MCS-Project-Window"
                className="Landing"
                id="MCS-Project-Window"
                handleWindowClose={handleWindowClose}
                handleFocus={handleFocus}
                initialTransform={imageInitialTransform}
                iconSrc={null}
                key="MCS-Project-Window"
                index={-1}
              > 
              <MCSProject />
            </Window>,            
            <Window
              windowName="Landing"
              className="Landing"
              id="Landing"
              handleWindowClose={handleWindowClose}
              handleFocus={handleFocus}
              initialTransform={landingInitialTransform}
              iconSrc={null}
              key="Landing"
              index={-1}
            >
              <p>hi</p>
            </Window>,
          ]);
      
          if (!isMobile) {
            engineRef.current.addEventListener('mousedown', handleDefocus);
          } else {
            engineRef.current.addEventListener('touchstart', handleDefocus);
          }
      
          return () => {
            if (engineRef.current) engineRef.current.removeEventListener('mousedown', handleDefocus);
          };
    }, []);

    // Finally, return the actual HTML
    return (
        <WindowControlContext.Provider value={useMemo(() => ({
          handleWindowOpen,
          handleWindowClose,
          handleFocus,
          getZIndex,
          getNewWindowPosition,
          setActiveWindowPosition,
          activeWindow,
          engineTransform: { w: width, h: height },
          //theme,
        }), [activeWindow, width, height])}
        >
            <main ref={engineRef} className="Engine">
              {openWindows.map((windowElem, index) => cloneElement(windowElem, { index }))}
            </main>
            
          {/* <main className="Desktop" style={{ backgroundImage: `url(${charlie})` }} ref={engineRef}>
            {openWindows.map((windowElem, index) => cloneElement(windowElem, { index }))}
            <IconGrid icons={desktopIcons} />
          </main>
          <footer className="haos-border Taskbar">
            {isMainMenuOpen && (
            <span className="haos-border Taskbar-menu">
              <div>
                <button
                  type="button"
                  className="haos-border haos-button"
                  onClick={() => setMainMenu(<ThemeMenu theme={theme} setTheme={setTheme} />)}
                >
                  Change Theme
                </button>
              </div>
              <div className="Taskbar-menu-content">{mainMenu}</div>
            </span>
            )}
            <button type="button" className="haos-border haos-button Taskbar-button" onClick={() => setMainMenuOpen(!isMainMenuOpen)}>
              <img src={haos} alt="icon for HAOS" />
              haOS
            </button>
            <span className="Taskbar-windows">
              {openWindows.map((windowElem, index) => (
                <button
                  type="button"
                  className={`haos-border haos-button Taskbar-button ${index === activeWindow ? 'active' : ''}`}
                  onClick={() => setActiveWindow(index)}
                  key={`Taskbar-${windowElem.props.windowName}`}
                >
                  <img src={windowElem.props.iconSrc} alt={`icon for ${windowElem.props.windowName}`} />
                  <p>{windowElem.props.windowName}</p>
                </button>
              ))}
            </span>
            <span className="Taskbar-controls">
              <Clock />
            </span>
          </footer> */}
        </WindowControlContext.Provider>
    );
};

export default Engine;


