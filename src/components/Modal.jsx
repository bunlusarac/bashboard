import React from 'react'
import { useAppLayerValue } from '../context/TodoContext'
import HeaderButton from './HeaderButton'
import ActionConstants from '../context/ActionConstants'
import clsx from 'clsx'

const Modal = ({enabled, 
    headerLabel, 
    bodyLabel, 
    leftButtonLabel, 
    rightButtonLabel, 
    leftButtonVariant, 
    rightButtonVariant,
    leftButtonClickHandler,
    rightButtonClickHandler}) => 
{
    const [{darkMode}, dispatch] = useAppLayerValue();

    const mapVariantStringToPropObject = (variantString) => {
        switch(variantString){
            case "primary":
                return {primary: true};
            case "secondary":
                return {secondary: true};
            case "red":
                return {red: true};
            default:
                return {};
        }
    }

    const addDispatchToHandlerProp = (handler) => {
        return () => {
            handler();

            const toggleClearModalAction = {
                type: ActionConstants.MODAL_CLEAR
            }

            dispatch(toggleClearModalAction); 
        }
    }    

    const modalContentStyle = clsx({
        ["modal-content"]: true,
        ["light-modal-content"]: !darkMode,
    });

    const modalHeaderStyle = clsx({
        ["modal-header"]: true,
        ["light-modal-header"]: !darkMode,
    });

    const modalBodyStyle = clsx({
        ["modal-body"]: true,
        ["light-modal-body"]: !darkMode,
    })
    
    if(!enabled){
        return null;
    }
    else{        
        return (
            <div className="modal-container">
                <div className={modalContentStyle}>
                    <div className={modalHeaderStyle}>
                        {headerLabel}
                    </div>
                    <div className={modalBodyStyle}>
                        {bodyLabel}
                    </div>
                    <div className="modal-footer">
                        <HeaderButton 
                        onClick={addDispatchToHandlerProp(leftButtonClickHandler)}
                        {...mapVariantStringToPropObject(leftButtonVariant)}>
                            {leftButtonLabel}
                        </HeaderButton>
                        
                        <HeaderButton 
                        onClick={addDispatchToHandlerProp(rightButtonClickHandler)}
                        {...mapVariantStringToPropObject(rightButtonVariant)}>
                            {rightButtonLabel}
                        </HeaderButton> 
                    </div>
                </div>
            </div>   
        )
    }
}

export default Modal;
