const validationReg = (values, message) => {
    let errors = {}

    if(!values.email){
        errors.email="Введите свой Email!"
    } else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email некорректен"
    } else if (message){
        errors.email="Пользователь с таким email уже существует!"}
    if (!values.password){
        errors.password="Введите свой пароль"
    }else if(!values.passwordRepeat){
        errors.passwordRepeat = "Повторите пароль"
    } 
    else if(values.password.length < 7){
        errors.password = "Пароль должен быть длиннее 7 символов"
    } else if(!(values.password === values.passwordRepeat)){
        errors.passwordRepeat = "Пароли не совпадают"
    }
    if(!values.firstName){
        errors.firstName="Введите свое имя!"
    }
    if(!values.secondName){
        errors.secondName="Введите свою фамилию!"
    }
    if(!values.phone){
        errors.phone="Введите свой номер телефона!"
    }
    return errors;
}

export default validationReg