import './styles.css'
import { useState } from "react";

export const FreightCalculator = () => {         
    
    const [value, setValue] = useState('');
    const [ valueSent, setValueSent ] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            if (value.trim() !== '') {
                setValueSent(value);
            }
            
        }
    };


    return (
        <>
        <input className='CEP-input'
        placeholder='Insira seu CEP' 
        type='text'
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        ></input>

        { valueSent && 
            <p>CEP enviado: {valueSent}</p>
        }
        </>
    );
}
