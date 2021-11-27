import React, { useState, useEffect } from 'react'
import { useAppLayerValue } from '../context/TodoContext'
import HeaderButton from './HeaderButton'
import ActionConstants from '../context/ActionConstants'
import { FaEdit } from 'react-icons/fa'

import clsx from 'clsx'

const EditModal = ({enabled}) => 
{
    const [content, setContent] = useState("");
    const [{editModal, darkMode}, dispatch] = useAppLayerValue();
    
    
    useEffect(() => {
        console.log(editModal);
        setContent(editModal.content);
    }, [editModal.enabled]);

    const addDispatchToHandler = (handler) => {
        return () => {
            handler();

            const toggleEditModalAction = {
                type: ActionConstants.MODAL_EDIT,
                payload: {
                    enabled: false,
                    id: undefined,
                    content: undefined,  
                }
            }

            dispatch(toggleEditModalAction); 
        }
    }    

    const updateTodo = () => {
        const updateTodoAction = {
            type: ActionConstants.UPDATE_TODO,
            payload: {
                updatedTodoId: editModal.id,
                newContent: content
            }
        }

        console.log(updateTodoAction);
        dispatch(updateTodoAction);
    }

    const textAreaSubmitHandler = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            addDispatchToHandler(updateTodo)();
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

    const modalInputEditStyle = clsx({
        ["todo-input-edit"]: true,
        ["light-input-edit"]: !darkMode,
    })

    if(!enabled){
        return null;
    }
    else{        
        return (
            <div className="modal-container">
                <div className={modalContentStyle}>
                    <div className={modalHeaderStyle}>
                        <FaEdit size={20}/>
                        {' '} Edit todo
                    </div>
                    <div className={modalBodyStyle}>
                        <textarea
                        className={modalInputEditStyle}
                        autoFocus
                        onKeyPress={textAreaSubmitHandler}
                        value={content}
                        onChange={e => setContent(e.target.value)}/>
                    </div>
                    <div className="modal-footer">
                        <HeaderButton 
                        onClick={addDispatchToHandler(()=>{})}
                        red>
                            Discard
                        </HeaderButton>
                        
                        <HeaderButton 
                        onClick={addDispatchToHandler(updateTodo)}
                        primary>
                            Done
                        </HeaderButton> 
                    </div>
                </div>
            </div>   
        )
    }
}

export default EditModal;
