import { useState, useEffect } from "react"
import "./ChatPage.css"
import MessageBody from "./components/body"
import MessageBlock from "./components/message-block"
import Sidebar from "./components/sidebar"
import { useContext} from "react"
import {Context} from "../../index"
import { useParams } from "react-router-dom"
import { getMsg } from "../../http/UsetApi"

const ChatPage = ({socket}) => {
    const params = useParams()

    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState('')
    const {user} = useContext(Context)
    const id = user.UserId
    const getMessages = async () => {
        try{
            await getMsg(params['id'])
            .then(response => 
                {   
                    setMessages(response['data'])
                    console.log(response)
                    
                })
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
        socket.on('response', (data) => {
            setMessages([...messages, data])   
        })
    }, [messages, socket])
    useEffect(() => {
        setChat(params['id'])
        if (params['id'] != 'home'){
            getMessages()
        }
    }, [params['id']])
    return(
    <>
    <div className="ChatPage__wrapper">
        <Sidebar id = {id}/>
        <div className="ChatPage__main">
            <MessageBody messages= {messages} chatId = {chat} id = {id}/>
            <MessageBlock socket = {socket} id = {id}/>
        </div>
    </div>
    
    </>
)

}
export {ChatPage}