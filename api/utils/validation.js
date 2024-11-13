const validator = require('validator'); // declaração da biblioteca validator

// TODAS AS FUNÇÕES DECLARA O ARRAY ERRORS E O RETORNA

// Função para verificar campos vazios
const checkForEmpty = (...inputs) => {
    const errors = [];
    inputs.forEach((input) => { // para cada input que foi recebido, é checado se ele foi preenchido
        if (!input) { // se não foi preenchido, adiciona uma mensagem de erro ao array errors
            errors.push(`O campo ${input} é obrigatório`);
        }
    });
    return errors; 
};

// Verifica se o email é válido com o validator
const checkEmail = (email) => {
    const errors = [];
    if (!validator.isEmail(email)) { // se o email enviado não é válido, adiciona uma mensagem de erro ao array errors
        errors.push('Email é inválido');
    }
    return errors;
};

// Checa a segurança da senha
const checkPassword = (password) => {
    const errors = [];
    const hasLowerCase = /[a-z]/.test(password); // declaração do teste regex para saber se a senha tem letras minúsculas
    const hasUpperCase = /[A-Z]/.test(password); // declaração do teste regex para saber se a senha tem letras maiúsculas
    const hasNumber = /\d/.test(password); // declaração do teste regex para saber se a senha tem números
    const hasMinDigits = password.length >= 8; // declaração do teste regex para saber se a senha tem 8 dígitos

    if (!hasMinDigits) {
        errors.push('A senha deve ter no mínimo 8 caracteres'); // se a senha não tem 8 dígitos, adiciona uma mensagem de erro ao array errors
    }
    if (!hasNumber) {
        errors.push('A senha deve ter no mínimo 1 número'); // se a senha não tem números, adiciona uma mensagem de erro ao array errors
    }
    if (!hasUpperCase) {
        errors.push('A senha deve conter no mínimo 1 letra maiúscula'); // se a senha não tem letra maiúscula, adiciona uma mensagem de erro ao array errors
    }
    if (!hasLowerCase) {
        errors.push('A senha deve conter no mínimo 1 letra minúscula'); // se a senha não tem letra minúscula, adiciona uma mensagem de erro ao array errors
    }
    return errors;
};

// Checa se as senhas são iguais
const checkEqualPasswords = (password, password2) => {
    const errors = [];
    if (password !== password2) { // se as senhas não forem iguais, adiciona uma mensagem de erro ao array errors
        errors.push('As senhas devem ser iguais');
    }
    return errors;
};

// Verifica se nome e sobrenome contêm apenas letras e permite espaços e acentos
const checkIfNameIsString = (name, surname) => {
    const errors = [];
    const lettersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; // Aceita letras, acentos e espaços

    // se o nome conter caracteres que não sejam letras ou espaços, adiciona uma mensagem de erro ao array errors
    if (!lettersRegex.test(name)) {
        errors.push('Seu nome deve conter apenas letras e espaços'); 
    }

    // se o sobrenome conter caracteres que não sejam letras ou espaços, adiciona uma mensagem de erro ao array errors
    if (!lettersRegex.test(surname)) {
        errors.push('Seu sobrenome deve conter apenas letras e espaços'); 
    }
    return errors;
};

// Função para executar todas as validações e verificar se deve submeter o formulário
exports.shouldSubmit = (name, surname, email, password, password2) => {
    const errors = [ // declaração dos arrays retornados por todas as validações
        ...checkForEmpty(name, surname, email, password, password2),
        ...checkEmail(email),
        ...checkPassword(password),
        ...checkEqualPasswords(password, password2),
        ...checkIfNameIsString(name, surname),
    ];

    
    return { isValid: !errors.length, errors }; // retorna um objeto com a propriedade isValid, que informa se os dados são válidos e o array de errors
};