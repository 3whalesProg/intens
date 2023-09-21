import ApplicationNotActiveItem from "./ApplicationNotActiveItem"
const ApplicationNotActiveList = ({application}) => {
    return(
        <>
        <li className="construction__active-list-item">
            <div className="construction__active-list-item-info">
                <div className="app-title">Заявка-{application['appId']}</div>
                <div className="app-date">{application['dateApp'].slice(0,10)}</div>
            </div>
            <ul className="app__items-list">
            {application['items'].map(order => {
                if(!order['active']){
                    return(
                             <ApplicationNotActiveItem order = {order} />
                         )
                }
             })}               
            </ul>
        </li>
        </>
    )
}
export default ApplicationNotActiveList