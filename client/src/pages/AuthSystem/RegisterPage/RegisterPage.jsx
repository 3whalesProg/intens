import "./Register.css"
import RegisterForm from "./RegisterForm"

const RegisterPage = () => {
    return(
            <>  
            <div className="Reg">
                <div className="Reg__left">
                    <div className="Reg__content">
                        <div className="Reg__welcome">
                            <h1 className="Reg__title title" style={{color: "white"}}>Добро пожаловать в систему InTens!</h1>
                            <h1 className="Reg__subtitle subtitle">Заполните форму регистрации.</h1>
                        </div> 
                        <RegisterForm />
                    </div>
                </div>
            </div>
            </>
    )
}

export {RegisterPage}