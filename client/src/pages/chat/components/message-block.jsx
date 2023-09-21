import { useEffect, useState } from "react"
import { getMsg, sendMsg } from "../../../http/UsetApi"
import {useParams } from "react-router-dom"
const MessageBlock = ({socket, id}) => {
    const params = useParams()
    const [message, setMessage] = useState('')
    const send = async () => {
        try{
            await sendMsg(params['id'], message,id)
            .then(response => 
                {   
                    console.log(response)
                })
        }  
        catch(e){
            console.log(e)
        }
    }
    const handleSend = (e) => {
        send()
        e.preventDefault()
        socket.emit('message', {text:message,
        id: id, to: params['id']})
        setMessage('')
    }
    return(
        <>
        <div className="ChatPage__message-block">
            <form onSubmit={handleSend} className="message-item">
                <input type = "text"
                placeholder="Напишите сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)} className="message-input"/>
                <button className="ChatPage__sendMessage-but" type="submite">
                    <svg width="28" height="28" viewBox="-2 -2 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 14L6.39589 8.56299C6.22297 7.0067 7.82469 5.86433 9.23983 6.53465L21.1842 12.1925C22.7093 12.9149 22.7093 15.0851 21.1842 15.8075L9.23983 21.4653C7.82469 22.1357 6.22297 20.9933 6.39589 19.437L7 14ZM7 14H14" stroke="#6F6CFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </form>
        </div>
        </>
    )
}
export default MessageBlock