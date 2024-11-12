const validator = require('validator');

// Função para verificar campos vazios
export const checkForEmpty = (...inputs) => {
    const errors = [];
    inputs.forEach((input) => {
        if (!input) {
            errors.push(`O campo ${input} é obrigatório`);
        }
    });
    return errors;
};

// Verifica se o email é válido com o validator
export const checkEmail = (email) => {
    const errors = [];
    if (!validator.isEmail(email)) {
        errors.push('Email é inválido');
    }
    return errors;
};

// Checa a segurança da senha
export const checkPassword = (password) => {
    const errors = [];
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinDigits = password.length >= 8;

    if (!hasMinDigits) {
        errors.push('A senha deve ter no mínimo 8 caracteres');
    }
    if (!hasNumber) {
        errors.push('A senha deve ter no mínimo 1 número');
    }
    if (!hasUpperCase) {
        errors.push('A senha deve conter no mínimo 1 letra maiúscula');
    }
    if (!hasLowerCase) {
        errors.push('A senha deve conter no mínimo 1 letra minúscula');
    }
    return errors;
};

// Checa se as senhas são iguais
export const checkEqualPasswords = (password, password2) => {
    const errors = [];
    if (password !== password2) {
        errors.push('As senhas devem ser iguais');
    }
    return errors;
};

// Verifica se nome e sobrenome contêm apenas letras
export const checkIfNameIsString = (name, surname) => {
    const errors = [];
    const lettersRegex = /^[A-Za-z]+$/;

    if (!lettersRegex.test(name)) {
        errors.push('Seu nome deve conter apenas letras');
    }
    if (!lettersRegex.test(surname)) {
        errors.push('Seu sobrenome deve conter apenas letras');
    }
    return errors;
};

// Função para executar todas as validações e verificar se deve submeter o formulário
export const shouldSubmit = (name, surname, email, password, password2) => {
    const errors = [
        ...checkForEmpty(name, surname, email, password, password2),
        ...checkEmail(email),
        ...checkPassword(password),
        ...checkEqualPasswords(password, password2),
        ...checkIfNameIsString(name, surname),
    ];

    
    return { isValid: !errors.length, errors };
};