  import React, {
    useState, useEffect, useRef, useContext,
  } from 'react';
  import propTypes from 'prop-types';
  import './Window.scss';
  import { isMobile } from 'react-device-detect';
  //import { folderIcon } from '../assets/images';
  import WindowControlContext from './WindowControlContext';
  
  const Window = ({
    windowName,
    initialTransform,
    iconSrc,
    index,
    className,
    id,
    children,
    initialWindowType
  }) => {
    const WindowControl = useContext(WindowControlContext);
  
    const [transform, setTransform] = useState({
      x: (WindowControl.engineTransform.w / 2)
      - (Math.min(initialTransform.w, WindowControl.engineTransform.w - 25) / 2),
      y: (WindowControl.engineTransform.h / 2)
      - (Math.min(initialTransform.h, WindowControl.engineTransform.h - 61) / 2),
      ...WindowControl.getNewWindowPosition(),
      ...initialTransform,
      w: Math.min(initialTransform.w, WindowControl.engineTransform.w - 25),
      h: Math.min(initialTransform.h, WindowControl.engineTransform.h - 61),
    });
    const transformRef = useRef(transform);
    const [events, setEvents] = useState({ drag: false, resizeX: false, resizeY: false });
    const eventsRef = useRef(events);
    const engineTransformRef = useRef(WindowControl.engineTransform);
  
    const windowRef = useRef(null);
    const titlebarRef = useRef(null);
    const [windowType, setWindowType] = useState(initialWindowType);
  
    const normalizeTransform = (transformVal) => {
      const newTransform = { ...transformVal };
      if (transformVal.x < 0) {
        newTransform.x = 0;
      } else if (transformVal.x + transformVal.w > engineTransformRef.current.w) {
        newTransform.x = engineTransformRef.current.w - transformVal.w;
      }
      if (transformVal.y < 0) {
        newTransform.y = 0;
      } else if (transformVal.y + transformVal.h > engineTransformRef.current.h) {
        newTransform.y = engineTransformRef.current.h - transformVal.h;
      }
      return newTransform;
    };
  
    useEffect(() => {
      if (index === WindowControl.activeWindow) {
        WindowControl.setActiveWindowPosition({ x: transform.x, y: transform.y });
      }
    }, [transform]);
  
    useEffect(() => {
      if (index === WindowControl.activeWindow) {
        WindowControl.setActiveWindowPosition({ x: transform.x, y: transform.y });
      }
    }, [WindowControl.activeWindow]);
  
    useEffect(() => {
      engineTransformRef.current = WindowControl.engineTransform;
    }, [WindowControl.engineTransform]);
  
    useEffect(() => {
      if (index === WindowControl.activeWindow) {
        WindowControl.setActiveWindowPosition({ x: transform.x, y: transform.y });
      }
  
      let prevPosition = null;
      let windowSize = { w: WindowControl.engineTransform.w, h: WindowControl.engineTransform.h };
  
      const handleTitlebarMouseDown = (e) => {
        const event = 'targetTouches' in e ? e.targetTouches[0] : e;
        prevPosition = { x: event.clientX, y: event.clientY };
        eventsRef.current = { ...events, drag: true };
        setEvents(eventsRef.current);
      };
  
      const handleWindowMouseDown = (e) => {
        // TODO: need to make a similar thing for selecting an active object
        WindowControl.handleFocus(id, windowRef);
        const event = 'targetTouches' in e ? e.targetTouches[0] : e;
        if (event.target !== event.currentTarget) return;
        prevPosition = { x: event.clientX, y: event.clientY };
        const relPosition = {
          x: event.clientX - transformRef.current.x,
          y: event.clientY - transformRef.current.y,
        };
        if (relPosition.x < 10) {
          eventsRef.current = { ...events, resizeX: 'left' };
        } else if (relPosition.x > transformRef.current.w - 10) {
          eventsRef.current = { ...eventsRef.current, resizeX: 'right' };
        } else {
          eventsRef.current = { ...eventsRef.current, resizeX: false };
        }
        if (relPosition.y < 10) {
          eventsRef.current = { ...eventsRef.current, resizeY: 'up' };
        } else if (relPosition.y > transformRef.current.h - 10) {
          eventsRef.current = { ...eventsRef.current, resizeY: 'down' };
        } else {
          eventsRef.current = { ...eventsRef.current, resizeY: false };
        }
        setEvents(eventsRef.current);
      };
  
      const handleMouseMove = (e) => {
        if (!('targetTouches' in e)) e.preventDefault();
        const event = 'targetTouches' in e ? e.targetTouches[0] : e;
        if (!eventsRef.current.drag
          && !eventsRef.current.resizeX
          && !eventsRef.current.resizeY) return;
        const delta = { x: event.clientX - prevPosition.x, y: event.clientY - prevPosition.y };
        prevPosition = { x: event.clientX, y: event.clientY };
        if (eventsRef.current.drag) {
          if (event.clientX !== 0 && event.clientY !== 0 ) {
            transformRef.current = {
              ...transformRef.current,
              x: transformRef.current.x + delta.x,
              y: transformRef.current.y + delta.y,
            };

            if (transformRef.current.y <= 0) {
              transformRef.current = {
                ...transformRef.current,
                x: transformRef.current.x,
                y: 0,
              };
            }

            if (transformRef.current.x <= 0) {
              transformRef.current = {
                ...transformRef.current,
                x: 0,
                y: transformRef.current.y,
              };
            }

            if (transformRef.current.x >= (WindowControl.engineTransform.width - transformRef.width)) {
              transformRef.current = {
                ...transformRef.current,
                x: (WindowControl.engineTransform.width - transformRef.width),
                y: transformRef.current.y,
              };
            }

            if (transformRef.current.y >= (WindowControl.engineTransform.height - transformRef.height)) {
              transformRef.current = {
                ...transformRef.current,
                x: transformRef.current.x,
                y: (WindowControl.engineTransform.height - transformRef.height),
              };
            }

            setTransform(transformRef.current);
          }
        } else if (eventsRef.current.resizeX || eventsRef.current.resizeY) {
          if (event.clientX !== 0 && event.clientY !== 0) {
            if (eventsRef.current.resizeX === 'left' && (transformRef.current.w > 250 || delta.x < 0)) {
              transformRef.current = {
                ...transformRef.current,
                x: transformRef.current.x + delta.x,
                w: transformRef.current.w - delta.x,
              };
            } else if (eventsRef.current.resizeX === 'right') {
              transformRef.current = {
                ...transformRef.current,
                w: transformRef.current.w + delta.x,
              };
            }
            if (eventsRef.current.resizeY === 'up' && (transformRef.current.h > 250 || delta.y < 0)) {
              transformRef.current = {
                ...transformRef.current,
                y: transformRef.current.y + delta.y,
                h: transformRef.current.h - delta.y,
              };
            } else if (eventsRef.current.resizeY === 'down') {
              transformRef.current = {
                ...transformRef.current,
                h: transformRef.current.h + delta.y,
              };
            }
  
            setTransform(transformRef.current);
          }
        }
      };
  
      const handleMouseUp = () => {
        prevPosition = null;
        eventsRef.current = { drag: false, resizeX: false, resizeY: false };
        setEvents(eventsRef.current);
      };
  
      const handleResize = () => {
        const delta = {
          x: engineTransformRef.current.w - windowSize.w,
          y: engineTransformRef.current.h - windowSize.h,
        };
        windowSize = { w: engineTransformRef.current.w, h: engineTransformRef.current.h };
        transformRef.current = {
          ...transformRef.current,
          x: transformRef.current.x + (delta.x / 2),
          y: transformRef.current.y + (delta.y / 2),
        };
        transformRef.current = normalizeTransform(transformRef.current);
        setTransform(transformRef.current);
      };

      const handleRightClickSelect = (e) => {
        if (!('targetTouches' in e) && windowType == 1) {
          e.preventDefault();
          WindowControl.handleActiveObjectSelection(id, windowRef);
        }

        
      }
  
      if (!isMobile) {
        windowRef.current.addEventListener('mousedown', handleWindowMouseDown);
        titlebarRef.current.addEventListener('mousedown', handleTitlebarMouseDown);
        windowRef.current.addEventListener('contextmenu', handleRightClickSelect);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      } else {
        windowRef.current.addEventListener('touchstart', handleWindowMouseDown);
        titlebarRef.current.addEventListener('touchstart', handleTitlebarMouseDown);
        window.addEventListener('contextmenu', handleRightClickSelect);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchend', handleMouseUp);
      }
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        if (!isMobile) {
          if (windowRef.current) windowRef.current.removeEventListener('mousedown', handleWindowMouseDown);
          if (titlebarRef.current) titlebarRef.current.removeEventListener('mousedown', handleTitlebarMouseDown);
          window.removeEventListener('contextmenu', handleRightClickSelect);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        } else {
          if (windowRef.current) windowRef.current.removeEventListener('touchstart', handleWindowMouseDown);
          if (titlebarRef.current) titlebarRef.current.removeEventListener('touchstart', handleTitlebarMouseDown);
          window.removeEventListener('contextmenu', handleRightClickSelect);
          window.removeEventListener('touchmove', handleMouseMove);
          window.removeEventListener('touchend', handleMouseUp);
        }
  
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
      <span
        className="haos-border Window"
        id={id}
        ref={windowRef}
        style={{
          left: `${transform.x}px`,
          top: `${transform.y}px`,
          width: `${transform.w}px`,
          height: `${transform.h}px`,
          zIndex: WindowControl.getZIndex(id) > 0 ? WindowControl.getZIndex(id) : 0,
        }}
      >
        <div
          className="Window-titlebar"
          style={index === WindowControl.activeWindow
            ? { backgroundColor: 'red', color: 'blue' }
            : { backgroundColor: 'gray', color: 'darkgray' }}
          ref={titlebarRef}
        >
          <img className="Window-titlebar-icon" src={iconSrc} alt={`icon for ${windowName} window`} />
          <h2 className="Window-titlebar-text">{windowName}</h2>
          <button type="button" className="haos-border haos-button Window-titlebar-control" onClick={() => WindowControl.handleWindowClose(id)}>X</button>
        </div>
        <div className={`Window-content ${className}`}>
          {children}
        </div>
      </span>
    );
  };
  
  Window.propTypes = {
    windowName: propTypes.string.isRequired,
    initialTransform: propTypes.shape({
      x: propTypes.number,
      y: propTypes.number,
      w: propTypes.number,
      h: propTypes.number,
    }),
    iconSrc: propTypes.string,
    index: propTypes.number.isRequired,
    className: propTypes.string,
    id: propTypes.string,
    children: propTypes.node,
    initialWindowType: propTypes.number
  };
  
  Window.defaultProps = {
    initialTransform: {
      w: 500,
      h: 500,
    },
    iconSrc: null,
    className: '',
    id: '',
    children: null,
    initialWindowType: 0
  };
  
  export default Window;