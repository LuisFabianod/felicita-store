import validator from "validator";
const SHOW_ERROR_MESSAGE = 'show-error-message' // SPAN CLASSNAME

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

export const checkPassword = (password) => {
    const passwordValue = password.current.value; // declaração do valor do campo

    const hasLowerCase = /[a-z]/.test(passwordValue); // teste regex para saber se a senha tem letras minúsculas
    const hasUpperCase = /[A-Z]/.test(passwordValue); // teste regex para saber se a senha tem letras maiúsculas
    const hasNumber = /\d/.test(passwordValue); // teste regex para saber se a senha tem números
    const hasMinDigits = passwordValue.length >= 8; // teste para saber se a senha tem 8 dígitos

    // caso algum dos testes regex retorne falso, adiciona mensagem e classe de erro
    if(!hasMinDigits){
        password.current.classList.add(SHOW_ERROR_MESSAGE);
        showErrorMessage(password, 'A senha deve ter no mínimo 8 dígitos');
    } 
    if(!hasNumber){
        password.current.classList.add(SHOW_ERROR_MESSAGE);
        showErrorMessage(password, 'A senha deve ter no mínimo 1 número');
    } 
    if(!hasUpperCase){
        password.current.classList.add(SHOW_ERROR_MESSAGE);
        showErrorMessage(password, 'A senha deve ter letra no mínimo 1 letra maiúscula');
    } 
    if(!hasLowerCase){
        password.current.classList.add(SHOW_ERROR_MESSAGE);
        showErrorMessage(password, 'A senha deve ter letra no mínimo 1 letra minúscula');
    } 
    
}

// CHECA SE AS SENHAS SÃO IGUAIS
export const checkEqualPasswords = (password, password2) => {
    if(password.current.value !== password2.current.value){ // checa se os valores dos campos senha e repetir senha são iguais
        password2.current.classList.add(SHOW_ERROR_MESSAGE);
        showErrorMessage(password2, 'As senhas devem ser iguais.'); // caso não sejam, adiciona mensagem e classe de erro
    }
}

// ITERA SOBRE OS CAMPOS E CHECA QUAIS SÃO VAZIOS
 export const checkForEmpty = (...inputs) => {
    // itera sobre os campos e se o valor do campo estiver vazio, adiciona mensagem e classe de erro
    inputs.forEach((input) => {
        if (!input.current.value) {
            input.current.classList.add(SHOW_ERROR_MESSAGE);
            showErrorMessage(input, 'Campo obrigatório.');;
        }
    });
};

// ADICIONA O TEXTO PARA A SPAN DO CAMPO SOLICITADO
const showErrorMessage = (input, msg) => {
    const field = input.current.parentElement; // declaração da div pai do campo
    const spanError = field.querySelector('.error-message'); // declaração da span embaixo do campo
    spanError.innerText = msg; // o texto da span recebe a mensagem enviada
    field.classList.add(SHOW_ERROR_MESSAGE); // a div pai do campo recebe a classe show-error-message, que define o display da span como inline
}

// itera sobre os campos, se em algum deles existir a classe show-error-message, a função impede o envio do formulário
export const shouldSubmit = (newPasswordRef, newPassword2Ref) => {

    const inputs = [newPasswordRef, newPassword2Ref]; // declaração do array de inputs, para o forEach seja possível

    removeErrorClass(newPasswordRef, newPassword2Ref); // antes das validações, as classes de erro são removidas
    checkPassword(newPasswordRef)
    checkEqualPasswords(newPasswordRef, newPassword2Ref); // checa se os campos senha e repetir senha tem valores iguais
    checkForEmpty(newPasswordRef , newPassword2Ref)

    let submit = true; // variável que retornará um boolean que dirá se o form será enviado ou não
    inputs.forEach(input => { // itera sobre os inputs
        if(input.current.classList.contains(SHOW_ERROR_MESSAGE)){ // se for encontrada a classe de erro em algum input, o form não será enviado
            submit = false;
        }
    })
    return submit; // retorna boolean
};

