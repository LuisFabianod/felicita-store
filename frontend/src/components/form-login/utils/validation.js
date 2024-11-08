const validator = require('validator')

// SPAN CLASSNAME
const SHOW_ERROR_MESSAGE = 'show-error-message'

// REMOVE A CLASSE show-error-message NO COMEÇO DO SCRIPT
export const removeErrorClass = (...inputs) => {
    inputs.forEach((input) => {
        input.current.classList.remove(SHOW_ERROR_MESSAGE);
        const field = input.current.parentElement;
        field.classList.remove(SHOW_ERROR_MESSAGE);
    })
};

// ITERA SOBRE OS CAMPOS E CHECA QUAIS SÃO VAZIOS
 export const checkForEmpty = (...inputs) => {

    inputs.forEach((input) => {
        if (!input.current.value) {

            input.current.classList.add(SHOW_ERROR_MESSAGE);
            showErrorMessage(input, 'Campo obrigatório.');;
        }
    });
};

// CHECA SE O EMAIL É VÁLIDO COM O VALIDATOR
export const checkEmail = (email) => {
    if(!validator.isEmail(email.current.value)){
        email.current.classList.add(SHOW_ERROR_MESSAGE);
        showErrorMessage(email, 'Email inválido.');
    }
}

// ADICIONA O TEXTO PARA A SPAN DO CAMPO SOLICITADO
const showErrorMessage = (input, msg) => {
    const field = input.current.parentElement;
    const spanError = field.querySelector('.error-message');
    spanError.innerText = msg;
    field.classList.add(SHOW_ERROR_MESSAGE);
}

export const shouldSubmit = (...inputs) => {
    let submit = true;
    inputs.forEach(input => {
        if(input.current.classList.contains(SHOW_ERROR_MESSAGE)){
            submit = false;
        }
    })
    return submit;
};

