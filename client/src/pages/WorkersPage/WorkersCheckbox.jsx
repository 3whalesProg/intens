import {useSearchParams} from "react-router-dom"

const WorkersCheckbox = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleChange = (event) =>{
        setSearchParams("role=" + event.target.value)
    } 
    return(
        <>
        <div className="Workers__checkbox">
                <div className="Workers__checkbox-content">
                    <div className="Workers__checkbox-title title">Поиск по должности</div>
                    <div className="Workers__checkbox-item">
                    <input className="Workers__checkbox-check" type = "radio" name = 'role' value ='' onClick={handleChange} id = "radio_0"/> 
                    <label htmlFor="radio_0" className="Workers__radio-name">Все</label> 
                    </div>
                    <div className="Workers__checkbox-item">
                        <input className="Workers__checkbox-check" type = "radio" name = 'role' value ='Директор' onClick={handleChange} id = "radio_1"/> 
                        <label htmlFor="radio_1" className="Workers__radio-name">Директора</label> 
                    </div>
                    <div className="Workers__checkbox-item">
                        <input className="Workers__checkbox-check" type = "radio" name = 'role'value ='Бухгалтер' onClick={handleChange} id = "radio_2"/> 
                        <label htmlFor="radio_2" className="Workers__radio-name">Бухгалтеры</label>
                    </div>
                    <div className="Workers__checkbox-item">
                        <input className="Workers__checkbox-check" type = "radio" name = 'role' value ='Снабженец' onClick={handleChange} id = "radio_3"/> 
                        <label htmlFor="radio_3" className="Workers__radio-name">Снабженцы</label>
                    </div> 
                    <div className="Workers__checkbox-item">
                        <input className="Workers__checkbox-check" type = "radio" name = 'role'value ='Логист' onClick={handleChange} id = "radio_4"/> 
                        <label htmlFor="radio_4" className="Workers__radio-name">Логисты</label>
                    </div>
                    <div className="Workers__checkbox-item">
                        <input className="Workers__checkbox-check" type = "radio" name = 'role'value ='Прораб' onClick={handleChange} id = "radio_5"/> 
                        <label htmlFor="radio_5" className="Workers__radio-name">Прорабы</label>
                    </div>
                </div>              
        </div>
        </>
    )
}

export default WorkersCheckbox