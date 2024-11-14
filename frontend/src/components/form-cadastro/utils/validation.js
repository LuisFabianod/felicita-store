const validator = require('validator') // declaração da biblioteca validator

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

// checa se o valor dos campos nome e sobrenome só tem letras e barra de espaço
export const checkIfNameIsString = (nameInput, surnameInput) => {
    const name = nameInput.current.value; // declaração do valor do campo nome
    const surname = surnameInput.current.value; // declaração do valor do campo sobrenome

    const lettersRegex = /^[A-Za-z]+$/; // regex de letras + barra de espaço

    const isNameString = lettersRegex.test(name); // faz o teste regex no valor do nome
    const isSurnameString = lettersRegex.test(surname); // faz o teste regex no valor do sobrenome

    // caso algum dos testes regex retorne falso, adiciona mensagem e classe de erro
    if(!isNameString){
        nameInput.current.classList.add(SHOW_ERROR_MESSAGE);
        showErrorMessage(nameInput, 'Seu nome deve conter apenas letras');
    }

    if(!isSurnameString){
        surnameInput.current.classList.add(SHOW_ERROR_MESSAGE);
        showErrorMessage(surnameInput, 'Seu sobrenome deve conter apenas letras')
    }
}

// ADICIONA O TEXTO PARA A SPAN DO CAMPO SOLICITADO
const showErrorMessage = (input, msg) => {
    const field = input.current.parentElement; // declaração da div pai do campo
    const spanError = field.querySelector('.error-message'); // declaração da span embaixo do campo
    spanError.innerText = msg; // o texto da span recebe a mensagem enviada
    field.classList.add(SHOW_ERROR_MESSAGE); // a div pai do campo recebe a classe show-error-message, que define o display da span como inline
}

// itera sobre os campos, se em algum deles existir a classe show-error-message, a função impede o envio do formulário
export const shouldSubmit = (nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref) => {

    const inputs = [nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref]; // declaração do array de inputs, para o forEach seja possível

    removeErrorClass(nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref); // antes das validações, as classes de erro são removidas

    checkEmail(emailRef); // checa se email é válido
    checkEqualPasswords(passwordRef, password2Ref); // checa se os campos senha e repetir senha tem valores iguais
    checkPassword(passwordRef); // checa se a senha segue as restrições de segurança
    checkIfNameIsString(nomeRef, sobrenomeRef); // checa se  o nome tem apenas valores permitidos
    checkForEmpty(nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref); // checa se existe algum campo vazio

    let submit = true; // variável que retornará um boolean que dirá se o form será enviado ou não
    inputs.forEach(input => { // itera sobre os inputs
        if(input.current.classList.contains(SHOW_ERROR_MESSAGE)){ // se for encontrada a classe de erro em algum input, o form não será enviado
            submit = false;
        }
    })
    return submit; // retorna boolean
};

