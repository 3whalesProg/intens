import "./ConstructionPage.css"
import { useEffect, useState } from "react"
import { getConstructions } from "../../http/UsetApi"
import ConstructionObject from "./ConstructionObject"

const ConstructionPage = () => {
    const [constructions, setConstructions] = useState([])
    const getConst = async () => {
        try{
            await getConstructions()
            .then(response => {
                    setConstructions(response['data']['sortedConst'])
                })
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
        getConst()
    },[])
    return(
        <>
        <div className="Construction__wrapper">
            <div className="Construction__main">
                <div className="Construction__content">
                    <ul className="Construction__row">
                        {constructions.toReversed().map((Construction) => {
                            return(
                            <li className="Construction__item">
                                <ConstructionObject Construction={Construction} />
                            </li>
                            )                         
                        })}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}
export {ConstructionPage}