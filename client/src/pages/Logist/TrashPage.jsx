import { useState } from "react"
import { trashinfo, addCarsDay, FindBad } from "../../http/UsetApi"
import { useEffect } from "react"
import TrashModalAdd from "./TrashModalAdd"
import "./Trash.css"

const TrashPage = () => {
    const [data, setData] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [dayButton, isDaybutton] = useState(false)
    const [badButton, isBadbutton] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [responseStatus, setResponseStatus] = useState("")

    const getinfo = async () => {
            try{    
                    await trashinfo(values.carId, values.date)
                    .then(response => {
                        setData(response.data.candidate.arr[values.date])
                    })
    
                }
            catch (e){
                console.log(e)
            }
            }
    
    const BadDay = async () => {
        try{
            setIsLoading(true)
            await FindBad(values.carId, values.date)
            .then(response => 
                {setResponseStatus(response['data']['respone'])
                setIsLoading(false)})
        }
        catch(e){
            console.log(e)
        }
    }
    
    const handleChange = (event) => {
        setValues({
            ...values, [event.target.name]: event.target.value
        })
    }
    const InfoDay = (event) => {
        event.preventDefault()
        isDaybutton(true)
    }
    const badDay = (event) => {
        event.preventDefault()
        isBadbutton(true)
    }
    const openModal = (event) => {
        event.preventDefault()
        setModalActive(true)
    }
    const SendBadDay = (event) => {
        event.preventDefault()
        setResponseStatus('')
        if (values.carId && values.date){
            BadDay()
        }

    }
    const [values, setValues] = useState({
        carId: "",
        date: "",
    })
    useEffect(() => {
        if (values.carId && values.date){
            getinfo()
             }
        }, [values])
    return(
        <>
        <div className="Trash__wrapper">
            <div className="Trash__main">
            <div className="Trash__left">
                    <div className="Trash__checkbox">
                        <div className="Trash__checkbox_content">
                        <div className="Trash__checkbox_item">
                            <input className="Trash__checkbox_check" type = "radio" name = 'carId' value ='car467.0' onChange={handleChange} id = "radio_1"/> 
                            <label htmlFor="radio_1" className="Trash__radio_name">ЗИЛ О223ТС44</label> 
                        </div> 
                        <div className="Trash__checkbox_item">
                            <input className="Trash__checkbox_check" type = "radio" name = 'carId' value ='car480.0' onChange={handleChange} id = "radio_2"/> 
                            <label htmlFor="radio_2" className="Trash__radio_name">ЗИЛ О260ТС44</label>
                        </div> 
                        <div className="Trash__checkbox_item">
                            <input className="Trash__checkbox_check" type = "radio" name = 'carId'value ='car460.0' onChange={handleChange} id = "radio_3"/> 
                            <label htmlFor="radio_3" className="Trash__radio_name">ГАЗ О328ТС44</label>
                        </div>
                        <div className="Trash__checkbox_item">
                            <input className="Trash__checkbox_check" type = "radio" name = 'carId'value ='car466.0' onChange={handleChange} id = "radio_4"/> 
                            <label htmlFor="radio_4" className="Trash__radio_name">ЗИЛ О391ТС44</label>
                        </div>
                        <div className="Trash__checkbox_item">
                            <input className="Trash__checkbox_check" type = "radio" name = 'carId'value ='car492.0' onChange={handleChange} id = "radio_5"/> 
                            <label htmlFor="radio_5" className="Trash__radio_name">ЗИЛ О456РХ44</label>
                        </div>
                        <div className="Trash__checkbox_item">
                            <input className="Trash__checkbox_check" type = "radio" name = 'carId'value ='car542.0' onChange={handleChange} id = "radio_6"/> 
                            <label htmlFor="radio_6" className="Trash__radio_name">КАМАЗ Х762СР52</label>
                        </div>
                        <div className="Trash__checkbox_item">
                            <input className="Trash__checkbox_check" type = "radio" name = 'carId'value ='car417.0' onChange={handleChange} id = "radio_7"/> 
                            <label htmlFor="radio_7" className="Trash__radio_name">СКАНИЯ М761РМ197</label>
                        </div>
                        <div className="Trash__checkbox_item">
                            <input className="Trash__checkbox_check" type = "radio" name = 'carId'value ='car421.0' onChange={handleChange} id = "radio_8"/> 
                            <label htmlFor="radio_8" className="Trash__radio_name">МЕРСЕДЕС У370АТ44</label>
                        </div>
                        <div className="Trash__checkbox_item">
                            <input className="Trash__checkbox_check" type = "radio" name = 'carId'value ='car422.0' onChange={handleChange} id = "radio_9"/> 
                            <label htmlFor="radio_9" className="Trash__radio_name">МЕРСЕДЕС У560АХ44</label>
                        </div>
                        <div className="Trash__checkbox_item">
                            <input className="Trash__checkbox_check" type = "radio" name = 'carId'value ='car420.0' onChange={handleChange} id = "radio_10"/> 
                            <label htmlFor="radio_10" className="Trash__radio_name">МАN У730АС44</label>
                        </div>  
                        </div>         
                    </div>
                    <div className="Trash__month">
                        <label className="Trash__month-title">Месяц</label>
                        <div className="ModalTrash__month-date">
                        <select name = "date" onChange={handleChange}>
                            <option name="date" onChange={handleChange} value="1">Январь</option>
                            <option name="date" onChange={handleChange} value="2">Февраль</option>
                            <option name="date" onChange={handleChange} value="3">Март</option>
                            <option name="date" onChange={handleChange} value="4">Апрель</option>
                            <option name="date" onChange={handleChange} value="5">Май</option>
                            <option name="date" onChange={handleChange} value="6">Июнь</option>
                            <option name="date" onChange={handleChange} value="7">Июль</option>
                            <option name="date" onChange={handleChange} value="8">Август</option>
                            <option name="date" onChange={handleChange} value="9">Сентябрь</option>
                            <option name="date" onChange={handleChange} value="10">Октрябрь</option>
                            <option name="date" onChange={handleChange} value="11">Ноябрь</option>
                            <option name="date" onChange={handleChange} value="12">Декабрь</option>
                        </select>
                        </div>
                    </div>
                    <button className="Trash__left-button" onClick={(event) => openModal(event)}>Собрать информацию до сегодняшнего дня</button>
                    <button className="Trash__find-errors" onClick={SendBadDay}>Выявить Несоответствия</button>  
                    {isLoading ? <>Загрузка, пожалуйста, подождите</> : <></>}  
                    {responseStatus? <>{responseStatus}</> : <></>}  
            </div>
            <div className="Trash__table">
                {data ? Object.keys(data).length ? Object.keys(data).map((key) => (
                    <div className="Trash__table-column" style={{ backgroundColor: key % 2 === 0 ? '#F0F0F0' : 'white' }}>
                    <div className="Trash__table-column-day">{key}</div>
                        <div className="Trash__table-column-row" style={{ backgroundColor: key % 2 === 0 ? '#F0F0F0' : 'white' }}>
                            {data[key].map(item => {return (<div className="Trash__table-column-row-item">{item}</div>)})}
                        </div>
                </div>
                )): <>Пусто!</> : <>Пусто!</>}        
            </div>
            <div className="Trash__right">
                  
            </div>  
            <TrashModalAdd active={modalActive} setActive={setModalActive}/>
            </div>
        </div>
        </>
    )
}

export {TrashPage}