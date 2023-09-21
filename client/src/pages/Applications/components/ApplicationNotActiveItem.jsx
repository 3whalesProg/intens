const ApplicationNotActiveItem = ({order}) => {
    return(
        <>
        <li className="app__items-item" style={{backgroundColor: "#d9d9d9"}}>
            <div className="app__items-item-left">
                <div className="app__items-item-title">{order['title']}</div>
                <div className="app__items-item-date">{order['createdAt'].slice(0,10) + " " + order['createdAt'].slice(11, 16)}</div>
                <div className="app__items-item-quantity">{order['quantity']}</div>
            </div>
            <div className="app__items-item-right">
                <div className="app__items-item-status">{order['status']}</div>
            </div>
        </li>
        </>
    )
}
export default ApplicationNotActiveItem