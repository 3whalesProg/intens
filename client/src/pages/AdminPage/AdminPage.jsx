
import { useState, useEffect } from "react"
import "./AdminPage.css"
import { adminReg } from "../../http/UsetApi"


const AdminPage = () =>{
    
    const signIn = async () => {
        try{
            const response = await adminReg(values.email, values.password, values.role,  values.phone, values.firstName, values.secondName)
            console.log(response)

        } catch(e){
            console.log(e)
        }
        
    }


    const [values, setValues] = useState({
        firstName: "",
        secondName: "",
        role: "",
        email: "",
        password: "",
        phone: ""
    })

    const [sub, isSub] = useState(false)

    const handeChange = (event) => {
        setValues({
            ...values, [event.target.name]: event.target.value
        })
    }
    const HandleFormSubmite = (event) =>{
        event.preventDefault()
        isSub(true)
    }
    useEffect(() =>{
        if(sub){
            console.log('click')
            signIn()
            isSub(false)
        }
    }, [sub])

    return(
        <>
        <div className="AdminPage__wrapper">
            <div className="AdminPage__main">
                <div className="AdminPage__content">
                <form className="Reg__SignUp-form">
                <h1 className="Reg__card-span">Имя</h1>
                    <input name="firstName"  
                    className="Reg__SignUp-input" 
                    type="text" 
                    value={values.firstName} 
                    onChange={handeChange} />
                <h1 className="Reg__card-span">Фамилия</h1>
                    <input name="secondName"  
                    className="Reg__SignUp-input" 
                    type="text" 
                    value={values.secondName} 
                    onChange={handeChange} />
                    <h1 className="Reg__card-span">Желаемая роль</h1>
                    <input name="role"  
                    className="Reg__SignUp-input" 
                    type="text" 
                    value={values.role} 
                    onChange={handeChange} />
                    <h1 className="Reg__card-span">email</h1>
                    <input name="email"  
                    className="Reg__SignUp-input" 
                    type="text" 
                    value={values.email} 
                    onChange={handeChange} />
                    <h1 className="Reg__card-span">пароль</h1>
                    <input 
                    name="password" 
                    className="Reg__SignUp-input" 
                    type="password" 
                    value={values.password}
                    onChange={handeChange} />
                    <h1 className="Reg__card-span">Номер телефона</h1>
                    <input name="phone"  
                    className="Reg__SignUp-input" 
                    type="text" 
                    value={values.phone} 
                    onChange={handeChange} />
                    <button onClick= {HandleFormSubmite} type="submit" className="Reg__SignUp-button">Зарегистрировать</button>
                </form> 
                </div>
                
            </div>
        </div>
        </>
    )
}

export {AdminPage}