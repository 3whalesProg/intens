import { Link} from "react-router-dom"

const ConstructionObject = ({Construction}) => {
    return(
        <>
        <Link to = {"/application?id=" + Construction['id']}>
            <div className="Construction__item_content">
                <div className="Construction__item_title">{Construction['title']}</div>
                <div className="Construction__item_body">
                    <h1 className="Construction__item_text subtitle">Последняя заявка:</h1>
                    <ul className="Construction__item_list">
                        <li className="Construction__item_order">{Construction['lastItem']}</li>
                        <li className="Construction__item_order last">...</li>
                    </ul>
                </div>
                <div className="Construction__item_info">
                    <div className="Construction__item_time">{Construction['date'].slice(11,16)}</div>
                    <div className="Construction__item_foreman">Руководитель проекта:<br/> {Construction['foremanName']}</div>
                </div>
            </div>
        </Link>
        </>
    )
}

export default ConstructionObject