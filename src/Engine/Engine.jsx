// This is the core manager for all windows and subcomponents.
import React, {
    useState, useEffect, useRef, cloneElement, useMemo,
} from 'react';
import propTypes from 'prop-types';
import './Engine.css';
import { isMobile } from 'react-device-detect';
import {
    Window, WindowControlContext,
} from '../Window';

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
};

export default Engine;


