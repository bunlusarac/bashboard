import React from 'react'
import clsx from 'clsx';
import { useAppLayerValue } from '../context/TodoContext';

const HeaderButton = ({children, primary, secondary, red, standard, responsiveLabel, onClick}) => {
    const [{darkMode}, _] = useAppLayerValue();
    
    const buttonStyles = clsx({
        ["header-btn"]: true,
        ["btn-primary"]: primary,
        ["btn-secondary"]: secondary,
        ["btn-red"]: red,
        ["btn-std"]: standard,
        ["responsive-content"]: responsiveLabel,
        ["btn-light-primary"]: !darkMode && primary,
        ["btn-light-secondary"]: !darkMode && secondary,
        ["btn-light-red"]: !darkMode && red,
        ["btn-light-std"]: !darkMode && standard
    });
    
    return (
        <button className={buttonStyles} onClick={onClick}>
            {children}
        </button> 
    )
}

export default HeaderButton
