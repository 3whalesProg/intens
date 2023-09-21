import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './AppRouter';
import UserState from './pages/UserProfile/UserState';


export const Context = createContext(null)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserState()
    }}>
    <App/>

  </Context.Provider>
);
