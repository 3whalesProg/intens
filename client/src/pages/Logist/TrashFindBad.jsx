import React, { useEffect } from "react";
import { addCarsDay} from "../../http/UsetApi"
import { useState } from "react"

const TrashModal = ({active, setActive}) => {
    const [isButton, setIsButton] = useState(false)
    const [responseStatus, setResponseStatus] = useState("")
    const [IsLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({
        month: "",
        day: ""
    })
    const addCars = async () => {
        try{    
                setIsLoading(true)
                await addCarsDay(values.month, values.day)
                .then(response => {
                    setResponseStatus(response['data']['respone'])
                    setIsLoading(false)
                })       
            }
        catch (e){
            console.log(e)
        }
    }
    const handleChange = (event) => {
        setValues({
            ...values, [event.target.name]: event.target.value
        })
    }
    const sendForm = (e) => {
        e.preventDefault()
        setResponseStatus('')
        if(values.day && values.month){
            if (values.day <= s_date && values.day > 0){
                addCars(values.month, values.day)
            }
        }
        }
        var s_date = 33 - new Date(2023, parseInt(values.month-1), 33).getDate()
    return(
        <>
        <div className= {active ? "TrashModal active": "TrashModal"} onClick={() => setActive(false)}>
        <form className="TrashModal__content" onClick={e => e.stopPropagation()}>
                        <div className="TrashModal__title">Сбор информации за заданный день</div>
                        <div className="TrashModal__subtitle">Убедитесь в том, что вы корректно задали день и месяц! 
                        Не нажимайте на кнопку несколько раз. Дождитесь окончания загрузки и в случае неудачи перезапустите процесс.</div>
                        <div className="ModalTrash__month">
                        Месяц:
                        <select name = "month" onChange={handleChange}>
                            <option name="month" onChange={handleChange} value="1">Январь</option>
                            <option name="month" onChange={handleChange} value="2">Февраль</option>
                            <option name="month" onChange={handleChange} value="3">Март</option>
                            <option name="month" onChange={handleChange} value="4">Апрель</option>
                            <option name="month" onChange={handleChange} value="5">Май</option>
                            <option name="month" onChange={handleChange} value="6">Июнь</option>
                            <option name="month" onChange={handleChange} value="7">Июль</option>
                            <option name="month" onChange={handleChange} value="8">Август</option>
                            <option name="month" onChange={handleChange} value="9">Сентябрь</option>
                            <option name="month" onChange={handleChange} value="10">Октрябрь</option>
                            <option name="month" onChange={handleChange} value="11">Ноябрь</option>
                            <option name="month" onChange={handleChange} value="12">Декабрь</option>
                        </select>
                        </div>
                        <div className="ModalTrash__input">Число:<input 
                    placeholder="Любое число месяца."
                    name="day"
                    onChange={handleChange}
                    value={values.day}
                    type="text"
                    className="Trash__SignUp-input" 
                    />  </div>
                    {IsLoading? <>Процесс начался, пожалуйста, подождите</> : <></>}
                    {responseStatus? <>{responseStatus}</> : <></>}
                    <button className="ModalTrash__button" type="submit" onClick={e => sendForm(e)}>Собрать информацию за день</button>
        </form>
        </div>
        </>
    )
}

export default TrashModal