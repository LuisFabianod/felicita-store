// função que um nome ou sobrenome e retorne ele formatado
const formatName = (name) => {
    // Separa o nome em partes (ex: "john doe" -> ["john", "doe"])
    const names = name.split(' ');
    
    // Formata cada parte do nome
    const formattedNames = names.map(namePart => {
        // Transforma a primeira letra em maiúscula e o restante em minúscula
        return namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();
    });

    // Junta as partes formatadas em uma única string
    return formattedNames.join(' ');
};

// função que recebe nome e sobrenome e retorna o nome completo formatado
const nameFormatation = (name) => {
    const formattedName = formatName(name); // Chamada da função de formatação com o valor do input

    return formattedName;
};

module.exports = nameFormatation