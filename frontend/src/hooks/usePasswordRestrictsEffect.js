import { useEffect } from "react"; 
import circleImage from '../assets/images/circulo.png'; // imagem que indica que a restrição não foi cumprida
import checkImage from '../assets/images/marca-de-verificacao.png'; // imagem que indica que a restrição foi cumprida

export const usePasswordRestrictsEffect = (passwordRef, setLowerCaseSrc, setUpperCaseSrc, setNumberSrc, setMinDigitsSrc) => {
    useEffect(() => {
        const validatePassword = () => {
            const password = passwordRef.current.value; // declaração do valor do campo senha

            const hasLowerCase = /[a-z]/.test(password); // teste regex que verifica se o valor da senha tem letras minúsculas
            const hasUpperCase = /[A-Z]/.test(password); // teste regex que verifica se o valor da senha tem letras maiúsculas
            const hasNumber = /\d/.test(password); // teste regex que verifica se o valor da senha tem números
            const hasMinDigits = password.length >= 8; // teste verifica se o valor da senha tem 8 dígitos

            // Atualiza o estado de cada imagem com base nas condições
            setLowerCaseSrc(hasLowerCase ? checkImage : circleImage);
            setUpperCaseSrc(hasUpperCase ? checkImage : circleImage);
            setNumberSrc(hasNumber ? checkImage : circleImage);
            setMinDigitsSrc(hasMinDigits ? checkImage : circleImage);
        };

        const passwordInput = passwordRef.current // valor do input html

        passwordInput.addEventListener('input', validatePassword); // qualquer evento que acontecer nesse input, a validação da senha será chamada

        return () => passwordInput.removeEventListener('input', validatePassword); // quando o componente for desmontado, o eventListener é retirado
    }, [passwordRef, setLowerCaseSrc, setUpperCaseSrc, setNumberSrc, setMinDigitsSrc]); // parâmetros que o useEffect vai observar
};