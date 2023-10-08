import { createContext } from 'react';

const WindowControlContext = createContext({
  handleWindowOpen: () => {},
  handleWindowClose: () => {},
  handleFocus: () => {},
  getZIndex: () => {},
  getNewWindowPosition: () => {},
  setActiveWindowPosition: () => {},
  activeWindow: -1,
  engineTransform: {},
  //theme: {},
});

export default WindowControlContext;