// recebe um nome e o retorna formatado
const formatName = (name) => {
    return name
        .split('') // separa os caracteres do nome
        .map((char, index) => index === 0 ? char.toUpperCase() : char.toLowerCase()) // itera sobre os caracteres, se for o primeiro, torna ele maiúsculo
        .join(''); // junta os caracteres do nome
};

export const nameFormatation = (nameInput) => {
    const name = nameInput.current.value; // declaração do valor do input
    const formattedName = formatName(name); // chamada da função de formatação com o valor do input

    return formattedName;
};