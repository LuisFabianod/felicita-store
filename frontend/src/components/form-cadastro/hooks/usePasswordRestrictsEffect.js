import { useEffect } from "react";
import circleImage from '../../../images/circulo.png';
import checkImage from '../../../images/marca-de-verificacao.png';

export const usePasswordRestrictsEffect = (passwordRef, setLowerCaseSrc, setUpperCaseSrc, setNumberSrc, setMinDigitsSrc) => {
    useEffect(() => {
        const validatePassword = () => {
            const password = passwordRef.current.value;

            const hasLowerCase = /[a-z]/.test(password);
            const hasUpperCase = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasMinDigits = password.length >= 8;

            // Atualiza o estado de cada imagem com base nas condições
            setLowerCaseSrc(hasLowerCase ? checkImage : circleImage);
            setUpperCaseSrc(hasUpperCase ? checkImage : circleImage);
            setNumberSrc(hasNumber ? checkImage : circleImage);
            setMinDigitsSrc(hasMinDigits ? checkImage : circleImage);
        };

        const passwordInput = passwordRef.current

        passwordInput.addEventListener('input', validatePassword);

        return () => passwordInput.removeEventListener('input', validatePassword);
    }, [passwordRef, setLowerCaseSrc, setUpperCaseSrc, setNumberSrc, setMinDigitsSrc]);
};