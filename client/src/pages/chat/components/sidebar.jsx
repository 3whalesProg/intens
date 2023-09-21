import { useEffect, useState } from "react"
import { getChats } from "../../../http/UsetApi"
import { Link} from "react-router-dom"

const Sidebar = ({id}) => {
    const[chatList, setChatList] = useState([])
    const getChatlist = async () => {
        try{
            await getChats(id)
            .then((response) =>{
                console.log(response)
                setChatList(response['data'])
            }
            )
       
        } catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
        getChatlist(id)
    },[])
    return(
        <div className="ChatPage__chats">
        <ul className="ChatPage__chats-list">
            {chatList.length === 0 ? <>Пусто !</>: chatList.map((item) => {
                return(
                    <Link to= {"/chat/" + item['chatId']}>
                    <li className="ChatPage__chats-item">
                <div className="ChatPage__chats-item-content">
                    <div className="ChatPage__chats-item-ava"></div>
                    <div className="ChatPage__chats-item-info">
                        <div className="ChatPage__chats-item-info-left">
                            <div className="ChatPage__chats-item-info-name">{item['chatId']}</div>
                            <div className="ChatPage__chats-item-info-lastMsg">Почему у тебя все всегда в пос...</div>
                        </div>
                        <div className="ChatPage__chats-item-info-right">
                            <div className="ChatPage__chats-item-info-date">10:12</div>
                            <div className="ChatPage__chats-item-info-seen">2</div>
                        </div>
                        
                    </div>
                </div>
            </li>
            </Link>
                )
            })}
        </ul>
        </div>
    )

}
export default Sidebar