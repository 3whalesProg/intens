const addNewItemErrors = (values) => {
    let errors = {}

    if(!values.title){
        errors.title="Введите название"
    } 
    else if (!values.quantity){
        errors.quantity="Введите количество!"
    } 

        
    return errors;
}

export default addNewItemErrors