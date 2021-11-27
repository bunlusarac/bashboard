import React from 'react'
import HeaderButton from './HeaderButton'
import { FaPlus, FaTrash } from 'react-icons/fa'
import ActionConstants from '../context/ActionConstants'
import { useAppLayerValue } from '../context/TodoContext'
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import {MdDarkMode, MdOutlineDarkMode} from 'react-icons/md'

const Header = () => {
    const [{ todos, darkMode }, dispatch] = useAppLayerValue();

    const addTodo = () => {
        const newTodo = {
            id: uuidv4(),
            content: "This is a new task!",
            isCompleted: false
        };

        const addTodoAction = {
            type: ActionConstants.ADD_TODO,
            payload: newTodo
        };
      
        dispatch(addTodoAction);
    }

    const toggleClearModal = () => {
        const toggleClearModalAction = {
            type: ActionConstants.MODAL_CLEAR
        }

        dispatch(toggleClearModalAction);
    }

    const switchDarkMode = () => {
        const switchDarkModeAction = {
            type: ActionConstants.DARK_MODE
        }

        dispatch(switchDarkModeAction);
    }

    const headerStyle = clsx({
        ["header"]: true,
        ["header-light"]: !darkMode,
        ["header-dark"]: darkMode,
    });

    return (
            <div className={headerStyle}>
                <div className="header-container">
                    <HeaderButton primary onClick={addTodo} responsiveLabel><FaPlus fill="white" size={20}/> <span>Add new item</span></HeaderButton>
                    <HeaderButton red responsiveLabel onClick={toggleClearModal}><FaTrash fill="white" size={20} responsiveLabel/> <span>Clear all items</span></HeaderButton>
                    <HeaderButton responsiveLabel standard onClick={switchDarkMode}>
                    {
                        darkMode ? <MdDarkMode size={20}/> : <MdOutlineDarkMode size={20}/>
                    }
                    </HeaderButton>
                </div>
            </div>
    )
}

export default Header
