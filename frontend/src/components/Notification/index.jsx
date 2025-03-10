import React, { useEffect } from 'react';
import closeIcon from '../../assets/images/x.png'
import './styles.css';

export const Notification = ({ title, src, descript, onClose, duration = 3000 }) => {

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer); 
        }
    }, [duration, onClose]);

    return (
        <div className='notification-container'>
            <div className='counter-bar'>

            </div>
            <div className='notification-header'>
                <img src={closeIcon} alt="close-icon" className='close-notification-icon' onClick={onClose}/>
            </div>
            <h1>{title}</h1>
            <div className='notification-body'>
                <img src={src} alt="notification-img" />
                <p className='notification-descript'>{descript}</p>
            </div>
        </div>
    );
};
