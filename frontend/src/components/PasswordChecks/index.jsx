import './styles.css'
import React, { useState } from "react";
import { usePasswordRestrictsEffect } from '../../hooks/usePasswordRestrictsEffect';
import circleImage from '../../assets/images/circulo.png'


export const PasswordChecks = ({passwordRef}) => {

    // DECLARAÇÃO DO ESTADO DAS IMAGENS DAS RESTRIÇÕES DA SENHA
    const [lowerCaseSrc, setLowerCaseSrc] = useState(circleImage);
    const [upperCaseSrc, setUpperCaseSrc] = useState(circleImage);
    const [numberSrc, setNumberSrc] = useState(circleImage);
    const [minDigitsSrc, setMinDigitsSrc] = useState(circleImage);



    usePasswordRestrictsEffect(passwordRef, setLowerCaseSrc, setUpperCaseSrc, setNumberSrc, setMinDigitsSrc)

    return (
        <>
            <p className='password-requests'>Sua senha deve conter:</p>
            <div className='password-checks'>
                <div className='div-lowercase'>
                    <img src={lowerCaseSrc} alt="check-icon" className='check-icon' />
                    <p className='lowercase'>Letra minúscula</p>
                </div>

                <div className='div-uppercase'>
                    <img src={upperCaseSrc} alt="check-icon" className='check-icon' />
                    <p className='uppercase'>Letra maiúscula</p>
                </div>

                <div className='div-number'>
                    <img src={numberSrc} alt="check-icon" className='check-icon' />
                    <p className='number'>Número</p>
                </div>

                <div className='div-min-digits'>
                    <img src={minDigitsSrc} alt="check-icon" className='check-icon' />
                    <p className='min-digits'>8 dígitos</p>
                </div>
            </div>
        </>
    )
}