import { Link, useSearchParams } from "react-router-dom"
import "./Application.css"
import { useEffect, useState } from "react"
import { delItem, getApplications, newItem, newItemStatus } from "../../http/UsetApi"
import addNewItemErrors from "./addNewItemErrors"

import ApplicationNotActiveList from "./components/ApplicationNotActiveList"


const ApplicationPage = () => {
    const [application, setApplication] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [errors, setErrors] = useState({})
    const [appId, setAppid] = useState('')
    const [reload, setReload] = useState(false)
    const [sub, isSub] = useState(false)
    const constId = searchParams.get('id') || ""
    const getApplication = async () => {
        try{
            await getApplications(constId)
            .then(response =>
                {   
                    console.log(response)
                    setApplication(response['data']['sortedApp'])
                    console.log(application)
                })
        }
        catch(e){
            
        }
    }

    const makeNewItem = async() => {
        try {
            await newItem(values.title, values.quantity, appId)
            .then(response => {
                const ger = application.map(item => {
                    if (item['appId'] == appId){
                        item['items'].push(response['data'])
                        return item
                    }
                    else{
                        return item
                    }
                })
                setApplication(ger)
                
            })
        }
        catch(e){
            
        }
    }
    const deleteItem = async(id, app) => {
        try {
            await delItem(id)
            .then(response => {
                    const ger = application.map(item => {
                    if (item['appId'] == app){
                        for (let i in item['items']){
                            if (item['items'][i]['id'] == id){
                                item['items'][i]['active'] = false
                            }
                        }
                        return item
                    }
                    else{
                        return item
                    }

                })
                setApplication(ger)
                setReload(true)
            })
        }
        catch(e){
            
        }
    }
    const NewStatus = async(itemId, itemStatus) => {
        try {
            const id = itemId
            const status = itemStatus
            await newItemStatus(id, status)
            .then(response=> {

            })
            }
        catch(e){
            
        }
    }


    const [values, setValues] = useState({
        title: "",
        quantity: ""
    })

    const handleChange = (event) => {
        setValues({
            ...values, [event.target.name]: event.target.value
        })
    }

    const HandleFormSubmite = (event) =>{
        event.preventDefault()
        setErrors(addNewItemErrors(values))
        setAppid(event.target.id)
        isSub(true)
        
    }

    const newStatus = (event) => {
        event.preventDefault()
        const id = event.target.id
        const app = event.target.value
        const ger = application.map(item => {
            if (item['appId'] == app){
                for (let i in item['items']){
                    if (item['items'][i]['id'] == id){
                        if (item['items'][i]['status'] == "отправлена")
                        { item['items'][i]['status'] = "В обработке"
                        NewStatus(id, item['items'][i]['status'])
                        return item}
                        if (item['items'][i]['status'] == "В обработке")
                        {item['items'][i]['status'] = "Заказано"
                        NewStatus(id, item['items'][i]['status'])
                        return item}
                        if (item['items'][i]['status'] == "Заказано")
                        {item['items'][i]['status'] = "Выполнено"
                        NewStatus(id, item['items'][i]['status'])
                        return item}
                        if (item['items'][i]['status'] == "Выполнено")
                        {item['items'][i]['status'] = "отправлена"
                        NewStatus(id, item['items'][i]['status'])
                        return item}
                        
                    }
                }
            }
            else{
                return item
            }

        })

        setApplication(ger)
        setReload(true)
        
    }
    const HandleDeleteItem = (event) => {
        event.preventDefault()
        deleteItem(event.target.id, event.target.value)
    }
    
    useEffect(() => {
        setReload(false)
    },[reload])

    useEffect(() =>{
        if(Object.keys(errors).length === 0 && sub){
            makeNewItem()
            setAppid('')
            values.title = ''
            values.quantity = ''
            isSub(false)
        }
        else{
            isSub(false)
            setAppid('')
        }
    }, [errors])

    useEffect(() => {
        getApplication()
    },[])
    return(
        <>
        <div className="Application__wrapper">
            <div className="Application__main">
                <div className="Application__content">
                    <Link to="/construction">
                    <div className="Application__back">
                        <div className="back_but"></div>
                        <div className="Application__back_title">Назад</div>
                    </div>
                    </Link>
                    <div className="construction__active">
                        <div className="construction__active-title">Активные заявки:</div>
                        <ul className="construction__active-list">
                            {application.length == 0 ? <>Пусто!</>: application.toReversed().map(application => {
                                {/*------------------List of applications--------------------*/}
                                return(
                                    <li className="construction__active-list-item">
                                        <div className="construction__active-list-item-info">
                                            <div className="app-title">Заявка-{application['appId']}</div>
                                            <div className="app-date">{application['dateApp'].slice(0,10)}</div>
                                        </div>
                                        <ul className="app__items-list">
                                            {application['items'].map(order => {
                                                if (order['active']){
                                                {/*---------List of order in application----------*/}
                                                return(
                                                    <li className="app__items-item" style={order['status'] == "отправлена" ? {backgroundColor: '#ffdfdf'}:
                                                    order['status'] == "Выполнено" ? {backgroundColor: '#cbffb3'} : 
                                                    order['status'] == "В обработке" ? {backgroundColor: '#fdf6ba'} : console.log('1')} id = {order['id']} value={application['appId']} onClick={event => {newStatus(event)}}>
                                                        <div className="app__items-item-left">
                                                            <div className="app__items-item-title">{order['title']}</div>
                                                            <div className="app__items-item-date">{order['createdAt'].slice(0,10) + " " + order['createdAt'].slice(11, 16)}</div>
                                                            <div className="app__items-item-quantity">{order['quantity']}</div>

                                                        </div>
                                                        <div className="app__items-item-right">
                                                            <button className="item-del" id ={order['id']} value={application['appId']} onClick={event => {HandleDeleteItem(event); event.stopPropagation()}}>
                                                                 Удалить
                                                            </button>
                                                            <div className="app__items-item-status">{order['status']}</div>
                                                        </div>
                                                    </li>
                                                )}
                                                {/*---------List of order in application----------*/}
                                            })}

                                {/*add new order in application, last item*/}
                                            <li className="app__items-item">
                                                        <div className="app__items-item-left">
                                                            <div className="app__items-item-title">
                                                            <input
                                                                placeholder="Название пункта"
                                                                className="add-item-title"
                                                                name="title" 
                                                                type="text" 
                                                                value={values.title}
                                                                onChange={handleChange} />
                                                                {errors.title && <div style = {{color: "#FF2F2F"}}>{errors.title}</div>}
                                                            </div>
                                                            <div className="app__items-item-date"></div>
                                                            <div className="app__items-item-quantity">
                                                            <input 
                                                                placeholder="Количество"
                                                                className="add-item-quantity"
                                                                name="quantity" 
                                                                type="text" 
                                                                value={values.quantity}
                                                                onChange={handleChange} />
                                                                {errors.quantity && <div style = {{color: "#FF2F2F"}}>{errors.quantity}</div>}
                                                            </div>
                                                        </div>
                                                        <div className="app__items-item-right">
                                                            <button className="addNewItem" id = {application['appId']} onClick={event => {HandleFormSubmite(event)}}>Создать пункт</button>
                                                        </div>
                                            </li>
                                {/*add new order in application, last item*/}
                                        </ul>
                                    </li>
                                )
                                 {/*------------------List of applications--------------------*/}
                            })}
                        </ul>
                    </div>
                </div>

                <div className="construction__active">
                        <div className="construction__active-title" style={{color: "#AAAAAA"}}>Не активные заявки:</div>
                        <ul className="construction__active-list">
                            {application.map(application => {
                                let NotActiveCounter = 0
                                application['items'].map(item => {
                                    console.log(item)
                                    if (!item['active']){
                                        NotActiveCounter += 1
                                    }
                                })
                                if (NotActiveCounter > 0){
                                return(
                                    <ApplicationNotActiveList application = {application}/>
                                )}})}
                        </ul>
                    </div>
            </div>
        </div>
        </>
    )
                        }
export {ApplicationPage}