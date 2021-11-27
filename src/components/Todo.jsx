import React, { useState, useEffect, useRef } from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox, MdOutlineDelete} from 'react-icons/md'
import { useAppLayerValue } from '../context/TodoContext'
import ActionConstants from '../context/ActionConstants'
import clsx from "clsx"

const Todo = ( {todo} ) => {
    const [{darkMode} , dispatch] = useAppLayerValue();
    const [hover, setHover] = useState(false);

    const removeTodo = () => {
        const removeTodoAction = {
            type: ActionConstants.REMOVE_TODO,
            payload: todo.id,
        }

        dispatch(removeTodoAction);
    }

    const completeTodo = () => {
        const completeTodoAction = {
            type: ActionConstants.COMPLETE_TODO,
            payload: todo.id
        }

        dispatch(completeTodoAction);
    }

    const editTodo = () => {
        const toggleEditModalAction = {
            type: ActionConstants.MODAL_EDIT,
            payload: {
                enabled: true,
                id: todo.id,
                content: todo.content
            }
        }

        dispatch(toggleEditModalAction);
    }


    const todoStyles = clsx({
        ["todo-item"]: true,
        ["light-item"]: !darkMode,
        ["completed"]: todo.isCompleted && darkMode,
        ["light-completed"]: todo.isCompleted && !darkMode,
    });

    const iconStyles = clsx({
        ["todo-icons"]: true,
        ["hidden"]: !hover
    })

    return (
        <div 
        className={todoStyles}
        onMouseOver={() => {setHover(true)}} 
        onMouseLeave={() => {setHover(false)}}>
            <div className="todo-content" onClick={editTodo}>
                {todo.content}   
            </div>

            <div className={iconStyles}>
                <MdOutlineDelete size={24} className="todo-icon" onClick={removeTodo}/>
                
                {todo.isCompleted ? (
                <MdCheckBox size={24} className="todo-icon" onClick={completeTodo}/>) :(
                <MdCheckBoxOutlineBlank size={24} className="todo-icon" onClick={completeTodo}/>)}
            </div> 
        </div>
    )
}

export default Todo
