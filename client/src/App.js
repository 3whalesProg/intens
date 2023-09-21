import {BrowserRouter} from 'react-router-dom'
import './App.css'
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import {Context} from "./index"
import AppRouter from "./AppRouter";
import {check} from "./http/UsetApi"
import { NavBar} from './pages/components/NavBar'
import io from 'socket.io-client'

const App = observer( () => {
  const {user} = useContext(Context)
  const isAuth = user.isAuth
  const URL = "http://localhost:5000";
  const socket = io(URL, { autoConnect: false });
  if (user.UserId){
    socket.auth = user.UserId
    socket.connect()
  }
  useEffect(() => {
    check().then(data => {
        if (data.id != null){
          user.setUser(true)
          user.setIsAuth(true)
          user.setUserId(data.id)
        }
    }).finally()
}, [])
  return (
    <>
        <BrowserRouter>
          {isAuth && <NavBar />}
            <AppRouter socket = {socket} />
        </BrowserRouter>
    </>
  );
})

export default App;
