import "./Login.css"
import LoginForm from "./LoginForm"

const LoginPage = () => {
    return(
        <>      
        <div className="SignUp">
            <div className="SignUp__card">
                <div className="SignUp__content">
                    <h1 className="SignUp__title title">
                         Войдите в свой InTens аккаунт
                    </h1>
                    <LoginForm/>
                </div>
            </div>
        </div>
        </>
    )
}


export {LoginPage}