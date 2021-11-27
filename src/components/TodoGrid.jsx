import React from 'react'
import Todo from './Todo'

const TodoGrid = ({todos}) => {
    return (
        <div className="grid-container">
            {
                todos && todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))
            }
        </div>
    )
}

export default TodoGrid
