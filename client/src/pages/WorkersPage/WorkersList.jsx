import {Link} from "react-router-dom"

const WorkersList = ({userList}) => {    
    return(
        <>
        <div className="Workers__content">
            <ul className="Workers__list">
                {userList ? userList.length ?  userList.map((item) => {return(<li className="Workers__list-item">
                    <div className="Workers__list-item-content">
                        <Link to = {"/profile/" + item['id']}>
                        <div className="Workers__list-item-info">
                            <div className="Workers__list-item-info-ava"></div>
                            <div className="Workers__list-item-info-text">
                                <div className="Workers__list-item-info-text-name">{item['secondName'] +' ' + item['firstName']}</div>
                                <div className="Workers__list-item-info-text-role">{item['role']}</div>
                            </div>
                        </div>
                        </Link> 
                        <div className="Workers__list-item-buttons">
                            <a className="toChat smallbutton" href="https://google.com">Написать</a>
                        </div>
                    </div>
                </li>)}) : <>Загрузка</>: <>Никого нет</>}
            </ul>
        </div>
        </>
    )
}
export default WorkersList
