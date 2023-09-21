import { useState, useEffect, useContext } from "react"
import validationReg from "./validationReg"
import {NavLink, useNavigate } from "react-router-dom"
import { registration } from "../../../http/UsetApi"
import { observer } from "mobx-react-lite"
import { Context } from "../../../index"

const RegisterForm = observer(() =>{
    const {user} = useContext(Context)
    let navigate = useNavigate();
    const [errors,setErrors] = useState({})
    const [sub, isSub] = useState(false)
    const [values, setValues] = useState({
        firstName: "",
        secondName: "",
        role: "",
        email: "",
        password: "",
        passwordRepeat: "",
        phone: ""
    })

    const signIn = async () => {
        try{
            const response = await registration(values.email, values.password, values.role,  values.phone, values.firstName, values.secondName)
            console.log(response)
            user.setUser(user)
            user.setIsAuth(true)
            user.setUserId(response.id)
            navigate('/profile/' + response.id)
        } catch(e){
            setErrors(validationReg(values, e.response.data.message))
        }
        
    }
    const handleChange = (event) => {
        setValues({
            ...values, [event.target.name]: event.target.value
        })
    }
    const HandleFormSubmite = (event) =>{
        event.preventDefault()
        setErrors(validationReg(values))
        isSub(true)
    }
    useEffect(() =>{
        if(Object.keys(errors).length === 0 && sub){
            signIn()
        }
    }, [errors])
    return(
        <>
        <form className="Reg__form">
            <h1 className="Reg__span">Имя</h1>
                <input name="firstName"  
                className="Reg__input" 
                type="text" 
                value={values.firstName} 
                onChange={handleChange} />
                {errors.firstName && <div style = {{color: "#FF2F2F"}}>{errors.firstName}</div>}
            <h1 className="Reg__span">Фамилия</h1>
            <input name="secondName"  
                className="Reg__input" 
                type="text" 
                value={values.secondName} 
                onChange={handleChange} />
                {errors.secondName && <div style = {{color: "#FF2F2F"}}>{errors.secondName}</div>}
            <h1 className="Reg__card-span">Желаемая роль</h1>
                <input name="role"  
                className="Reg__input" 
                type="text" 
                value={values.role} 
                onChange={handleChange} />
            <h1 className="Reg__span">email</h1>
                <input name="email"  
                className="Reg__input" 
                type="text" 
                value={values.email} 
                onChange={handleChange} />
                {errors.email && <div style = {{color: "#FF2F2F"}}>{errors.email}</div>}
            <h1 className="Reg__span">пароль</h1>
                <input 
                name="password" 
                className="Reg__input" 
                type="password" 
                value={values.password}
                onChange={handleChange} />
                {errors.password && <div style = {{color: "#FF2F2F"}}>{errors.password}</div>}
            <h1 className="Reg__span">повторите пароль</h1>
                <input 
                name="passwordRepeat" 
                className="Reg__input" 
                type="password" 
                value={values.passwordRepeat}
                onChange={handleChange} />
                {errors.passwordRepeat && <div style = {{color: "#FF2F2F"}}>{errors.passwordRepeat}</div>}
            <h1 className="Reg__span">Номер телефона</h1>
                <input name="phone"  
                className="Reg__input" 
                type="text" 
                value={values.phone} 
                onChange={handleChange} />
                {errors.phone && <div style = {{color: "#FF2F2F"}}>{errors.phone}</div>}
            <button onClick= {HandleFormSubmite} type="submit" className="Reg__button">Отправить заявку на регистрацию</button>
            <NavLink to="/login" className="Reg__link">Уже зарегистрированы?</NavLink>
        </form> 
        </>
    )
})

export default RegisterForm