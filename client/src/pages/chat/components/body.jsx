import { useParams } from "react-router-dom"

const MessageBody = ({messages, id, chatId}) => {
    console.log(chatId)
    return(
        <>
        <div className="ChatPage__chat">
            <div className="ChatPage__chat-content">
                { 
                    messages.map((el) => {
                        console.log(el)
                        if (el.to == chatId || el.chatChatId == chatId)
                        {
                        if (el.senderId == id || el.id == id){    
                            return(<div className="ChatPage__chat-message author-message">
                                        <div className="ChatPage__chat-message-content-author">{el.text}</div>
                                   </div>)
                            }
                        else{
                            return(
                                <div className="ChatPage__chat-message friend-message">
                                    <div className="ChatPage__chat-message-content-friend">{el.text}</div>
                                </div>)
                            
                        }}
                    })
                }
            </div>
        </div>
        </>
    )
}
export default MessageBody