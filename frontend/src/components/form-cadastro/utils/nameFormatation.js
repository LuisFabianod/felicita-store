const formatName = (name) => {
    // ITERA SOBRE AS LETRAS E SE FOR A PRIMEIRA, TORNA ELA MAIÚSCULA
    return name
        .split('')
        .map((char, index) => index === 0 ? char.toUpperCase() : char.toLowerCase())
        .join('');
};

export const nameFormatation = (nameInput, surnameInput) => {
    const name = nameInput.current.value;
    const surname = surnameInput.current.value;
    
    const formattedName = formatName(name);
    const formattedSurname = formatName(surname);
    
    const fullName = `${formattedName} ${formattedSurname}`;

    return fullName;
};