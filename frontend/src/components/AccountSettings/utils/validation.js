
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

export const checkNameLenght = (name) => {
    if(name.current.value.length > 240){
        name.current.classList.add(SHOW_ERROR_MESSAGE);
        showErrorMessage(name, 'O número máximo de caractéres é 240');
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
export const shouldSubmit = (nomeRef) => {

    const inputs = [nomeRef]; // declaração do array de inputs, para o forEach seja possível

    removeErrorClass(nomeRef); // antes das validações, as classes de erro são removidas
    checkNameLenght(nomeRef);
    checkForEmpty(nomeRef); // checa se existe algum campo vazio

    let submit = true; // variável que retornará um boolean que dirá se o form será enviado ou não
    inputs.forEach(input => { // itera sobre os inputs
        if(input.current.classList.contains(SHOW_ERROR_MESSAGE)){ // se for encontrada a classe de erro em algum input, o form não será enviado
            submit = false;
        }
    })
    return submit; // retorna boolean
};

