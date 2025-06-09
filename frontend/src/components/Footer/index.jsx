import './styles.css'
import React, { useState } from 'react';

export const Footer = () => {

    const [value, setValue] = useState('');

    return (
        <div className='footer'>
            <div className='footer-up'>
                <div className='newsletter'>
                    <h3>INSCREVA-SE E SEJA UMA CLIENTE VIP</h3>
                    <input
                        type="text"
                        name="search-bar"
                        className="search-bar"
                        placeholder={'Email'}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                </div>
                <div className='contact'>
                    <h3>FALE CONOSCO</h3>
                    <p>+5579981160650</p>
                    <p>FELICITAPIJAMARIA@GMAIL.COM</p>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>Copyright Felicita Pijamaria-2025. Todos os direitos reservados.</p>
            </div>
        </div>
    );
};
