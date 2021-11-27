import ActionConstants from "./ActionConstants";

//Initial state for todo state
export const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    darkMode: JSON.parse(localStorage.getItem('darkMode')) || false, 
    clearModal: false,
    editModal: {enabled: false, id: undefined, content: undefined},
};

//Reducer for todo operations
const reducer = (state, action) => {
    console.log(action);
    
    switch(action.type){
        case ActionConstants.ADD_TODO:
            const newTodo = action.payload;
            const newState = {
                ...state,
                todos: [newTodo, ...state.todos]  
            };

            localStorage.setItem("todos", JSON.stringify(newState.todos));

            return newState;
        case ActionConstants.REMOVE_TODO:
        {
            const removedTodoId = action.payload;
            const newTodos = [...state.todos].filter(todo => todo.id !== removedTodoId)
            const newState = {
                ...state,
                todos: newTodos
            };

            localStorage.setItem("todos", JSON.stringify(newState.todos));

            return newState;
        }
        case ActionConstants.COMPLETE_TODO:
        {
            const completedTodoId = action.payload;
            const newTodos = [...state.todos].map(todo => {
                if(todo.id === completedTodoId) {
                    return {...todo, isCompleted: !todo.isCompleted}
                }
                else{
                    return todo;
                }
            });

            const newState = {
                ...state,
                todos: newTodos
            }; 

            localStorage.setItem("todos", JSON.stringify(newState.todos));

            return newState; 
        }
        case ActionConstants.UPDATE_TODO:
        {
            const {updatedTodoId, newContent} = action.payload;
            const newTodos = [...state.todos].map(todo => {
                if (todo.id === updatedTodoId){
                    return {...todo, content: newContent}
                }
                else{
                    return todo;
                }
            })

            const newState = {
                ...state,
                todos: newTodos
            }; 

            localStorage.setItem("todos", JSON.stringify(newState.todos));

            return newState;
        }
        case ActionConstants.MODAL_CLEAR:
        {
            return {
                ...state,
                clearModal: !(state.clearModal)
            };
        }
        case ActionConstants.CLEAR_ALL_TODOS:
        {
            const newState = {
                ...state,
                todos: []
            };

            localStorage.setItem("todos", JSON.stringify(newState.todos));

            return newState; 
        }
        case ActionConstants.MODAL_EDIT:
        {
            return {
                ...state,
                editModal: {...action.payload}
            }
        }
        case ActionConstants.DARK_MODE:
        {
            const newState = {
                ...state,
                darkMode: !(state.darkMode)
            };

            localStorage.setItem("darkMode", JSON.stringify(newState.darkMode));

            return newState; 
        }
        default:
            return {...state};
    }
    
}

export default reducer;