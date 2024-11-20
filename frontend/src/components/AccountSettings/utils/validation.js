const validator = require('validator')

// SPAN CLASSNAME
const SHOW_ERROR_MESSAGE = 'show-error-message'

// REMOVE A CLASSE show-error-message NO COMEÇO DO SCRIPT
export const removeErrorClass = (...inputs) => {
    // itera sobre os campos e remove a classe show-error-message, para evitar o acúmulo de erros
    inputs.forEach((input) => {
        input.current.classList.remove(SHOW_ERROR_MESSAGE); 
        const field = input.current.parentElement; // a classe show-error-message está no campo e na div pai desse campo
        field.classList.remove(SHOW_ERROR_MESSAGE); // portanto ela é removida da div pai do campo também
    })
};

// CHECA SE O EMAIL É VÁLIDO COM O VALIDATOR
export const checkEmail = (email) => {
    // usa a biblioteca validator para verificar se a estrutura do email é válida
    if(!validator.isEmail(email.current.value)){
        email.current.classList.add(SHOW_ERROR_MESSAGE);
        showErrorMessage(email, 'Email inválido.'); // se não for válida, adiciona mensagem e classe de erro
    }
}

// ADICIONA O TEXTO PARA A SPAN DO CAMPO SOLICITADO
const showErrorMessage = (input, msg) => {
    const field = input.current.parentElement; // declaração da div pai do campo
    const spanError = field.querySelector('.error-message'); // declaração da span embaixo do campo
    spanError.innerText = msg; // o texto da span recebe a mensagem enviada
    field.classList.add(SHOW_ERROR_MESSAGE); // a div pai do campo recebe a classe show-error-message, que define o display da span como inline
}

export const shouldSubmit = (emailRef) => {

    const inputs = [emailRef] // declaração do array de inputs, para o forEach seja possível

    // CHAMADA DAS FUNÇÕES DE VALIDAÇÃO DO ARQUIVO validation.js
    removeErrorClass( emailRef); // antes das validações, as classes de erro são removidas
    checkEmail(emailRef); // checa se email é válido
    
    let submit = true; // variável que retornará um boolean que dirá se o form será enviado ou não
    inputs.forEach(input => { // itera sobre os inputs
        if(input.current.classList.contains(SHOW_ERROR_MESSAGE)){ // se for encontrada a classe de erro em algum input, o form não será enviado
            submit = false;
        }
    })
    return submit; // retorna boolean
};

