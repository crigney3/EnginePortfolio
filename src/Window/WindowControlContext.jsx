import { createContext } from 'react';

const WindowController = createContext({
  iconMap: () => {},
  handleWindowOpen: () => {},
  handleWindowClose: () => {},
  handleFocus: () => {},
  getZIndex: () => {},
  getNewWindowPosition: () => {},
  setActiveWindowPosition: () => {},
  activeWindow: -1,
  desktopTransform: {},
  theme: {},
});

export default WindowController;