import { useState, useEffect, useContext } from "react"
import validation from "./validation"
import {NavLink, useNavigate} from "react-router-dom"
import { login } from "../../../http/UsetApi"
import { observer } from "mobx-react-lite"
import { Context } from "../../../index"
const LoginForm = observer(() => {
    let navigate = useNavigate();
    const {user} = useContext(Context)
    const [errors,setErrors] = useState({})
    const [sub, isSub] = useState(false)
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const signIn = async () => {
    try{
            const response = await login(values.email, values.password).then( data => {
                if (data.id != null){
                    console.log(data.id)
                    user.setUser(user)
                    user.setIsAuth(true)
                    user.setUserId(data.id)
                    navigate('/profile/' + data.id)
                }
            })    
        }
    catch (e){
        setErrors(validation(values, e.response.data.message))
    }
    }

    const handleChange = (event) => {
        setValues({
            ...values, [event.target.name]: event.target.value
        })
    }
    const HandleFormSubmite = (event) =>{
        event.preventDefault()
        setErrors(validation(values))
        isSub(true)
    }

    useEffect(() =>{
        if(Object.keys(errors).length === 0 && sub){
            signIn()
        }
    }, [errors])
    return(
    <>
    <form className="SignUp__form">
        <h1 className="SignUp__subtitle">email</h1>
            <input name="email"  
            className="SignUp__input" 
            type="text" 
            value={values.email} 
            onChange={handleChange} />
            {errors.email && <div style = {{color: "#FF2F2F"}}>{errors.email}</div>}
        <h1 className="SignUp__subtitle">пароль</h1>
            <input 
            name="password" 
            className="SignUp__input" 
            type="password" 
            value={values.password}
            onChange={handleChange} />
            {errors.password && <div style = {{color: "#FF2F2F"}}>{errors.password}</div>}
        <button onClick= {HandleFormSubmite} type="submit" className="SignUp__button">Войти</button>
        <NavLink to="/register" className="Auth__link">Ещё не зарегистрированы?</NavLink>
    </form>
    </>
    )
})
export default LoginForm