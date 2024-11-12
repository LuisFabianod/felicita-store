const formatName = (name) => {
    // ITERA SOBRE AS LETRAS E SE FOR A PRIMEIRA, TORNA ELA MAIÚSCULA
    return name
        .split('')
        .map((char, index) => index === 0 ? char.toUpperCase() : char.toLowerCase())
        .join('');
};

exports.nameFormatation = (name, surname) => {
    const formattedName = formatName(name);
    const formattedSurname = formatName(surname);
    
    const formattedFullName = `${formattedName} ${formattedSurname}`;

    return formattedFullName;
};