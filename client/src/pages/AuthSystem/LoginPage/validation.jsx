
const validation = (values, message) => {
    let errors = {}

    if(!values.email){
        errors.email="Введите свой Email!"
    } else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email некорректен"
    }
    if (!values.password){
        errors.password="Введите свой пароль"
    } 
    if(message){
        switch(message){
            case 'Пользователь не найден': 
            errors.email = "Этот Email не зарегистрирован"
            break;
            case 'Указан неверный пароль': errors.password = "Пароль неверный" 
            break;
        }
    }
        
    return errors;
}

export default validation