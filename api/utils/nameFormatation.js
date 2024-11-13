// função que um nome ou sobrenome e retorne ele formatado
const formatName = (name) => {
    
    return name
        .split('') // separa todos caracteres do nome
        .map((char, index) => index === 0 ? char.toUpperCase() : char.toLowerCase()) // faz apenas o primeiro caractére ser maiúsculo 
        .join('');  // junta todos os caracteres
};

// função que recebe nome e sobrenome e retorna o nome completo formatado
exports.nameFormatation = (name, surname) => {
    const formattedName = formatName(name); // declaração do nome formatado
    const formattedSurname = formatName(surname); // declaração do sobrenome formatado
    
    const formattedFullName = `${formattedName} ${formattedSurname}`; // junção do nome e sobrenome formatados

    return formattedFullName; // retorna nome inteiro e formatado
};