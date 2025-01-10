export const initialState = {
    isAuthenticated: !!sessionStorage.getItem('token'),
    user: sessionStorage.getItem('user'),
    id: sessionStorage.getItem('id'),
    token: sessionStorage.getItem('token'),
    error: null,
    message: null,
    loading: false,
    tasks: []
}

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                message: action.payload.message,
                error: null,
                user: null,
                id: null,
                token: null,
                isAuthenticated: false
            }
        case 'REGISTER_ERROR':
            return {
                ...state,
                error: action.payload.error,
                message: null,
                user: null,
                id: null,
                token: null,
                loading: false,
                isAuthenticated: false
            }
        case 'LOGIN_SUCCESS':
            sessionStorage.setItem('token', action.payload.token)
            sessionStorage.setItem('id', action.payload.id)
            sessionStorage.setItem('user', action.payload.user)
            return {
                message: action.payload.message,
                error: null,
                user: action.payload.user,
                token: action.payload.token,
                id: action.payload.id,
                isAuthenticated: true
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.payload.error,
                message: null,
                user: null,
                id: null,
                token: null,
                loading: false,
                isAuthenticated: false
            }
        case 'LOGOUT':
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('id')
            sessionStorage.removeItem('user')
            return {
                ...state,
                error: null,
                message: action.payload.message,
                user: null,
                id: null,
                token: null,
                loading: false,
                isAuthenticated: false
            }
        case 'CLEAR_MESSAGE':
            return {
                ...state,
                message: null,
                error: null
            }
        case 'GET_TASKS':
            return {
                ...state,
                tasks: action.payload.tasks
            }
        case 'ADD_TASK_SUCCESS':
            return {
                ...state,
                tasks: [...state.tasks, action.payload.task],
                message: action.payload.message
            }
        case 'ADD_TASK_ERROR':
            return {
                ...state,
                message: null,
                error: action.payload.error
            }
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: [state.tasks.filter(task => task.id != action.payload.id)],
                message: action.payload.message
            }
        case 'DELETE_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}