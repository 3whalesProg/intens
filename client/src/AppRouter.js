import {Routes, Route} from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { authRoutes, publicRoutes } from './routes';
import { useContext } from 'react';
import { Context } from './index';
import ChatPage from './pages/chat/ChatPage';
import MessageBody from './pages/chat/components/body';


const AppRouter = observer( ({socket}) => {
    const {user} = useContext(Context)
    const isAuth = user.isAuth
    return (
      <>
      <Routes>
        {publicRoutes.map(({path, Component}) => <Route key ={path} path={path} Component={Component} socket ={socket}  exact/>)}
        {isAuth && authRoutes.map(({path, Component}) => 
        <Route key ={path} path={path} Component={() => {
          return <Component socket={socket} />
        }} exact/>
)} 
      </Routes>
      </>
    );
  })
  
  export default AppRouter;