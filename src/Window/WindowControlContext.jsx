import { createContext } from 'react';

const WindowControlContext = createContext({
  handleWindowOpen: () => {},
  handleWindowClose: () => {},
  handleFocus: () => {},
  getZIndex: () => {},
  getNewWindowPosition: () => {},
  setActiveWindowPosition: () => {},
  handleActiveObjectSelection: () => {},
  activeWindow: -1,
  activeObject: -1,
  engineTransform: {},
  //theme: {},
});

export default WindowControlContext;