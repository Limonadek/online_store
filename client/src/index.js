import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BasketDeviceStore from './store/BasketDeviceStore';
import BasketStore from './store/BasketStore';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';

const root = ReactDOM.createRoot(document.getElementById('root'));


export const Context = createContext(null);

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
    basket: new BasketStore(),
    basketDevice: new  BasketDeviceStore(),
  }}>
    <App />
  </Context.Provider>
);

