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

export const nameFormatation = (nameInput) => {
    const name = nameInput.current.value; // Declaração do valor do input
    const formattedName = formatName(name); // Chamada da função de formatação com o valor do input

    return formattedName;
};