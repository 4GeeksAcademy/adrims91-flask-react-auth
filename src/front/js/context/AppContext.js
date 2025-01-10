import React, { createContext, useReducer } from "react";
import { initialState, AppReducer } from "./AppReducer";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const register = async (email, password) => {
        try {
            const response = await fetch('https://didactic-guide-x5964qx4g6g43vr9-3001.app.github.dev/api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: 'REGISTER_SUCCESS', payload: { message: 'Usuario creado correctamente.' } });
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGE' });
                }, 1000);
                return data;
            } else {
                dispatch({ type: 'REGISTER_ERROR', payload: { error: data.error } });
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGE' });
                }, 1000);
            }
        } catch (error) {
            dispatch({ type: 'REGISTER_ERROR', payload: { error: 'Error de red o del servidor' } });
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('https://didactic-guide-x5964qx4g6g43vr9-3001.app.github.dev/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'LOGIN_SUCCESS', payload: { message: 'Autenticado.', user: data.user, token: data.token, id: data.id } });
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGE' });
                }, 1000);
            } else {
                const errorData = await response.json();
                dispatch({ type: 'LOGIN_ERROR', payload: { error: errorData.error } });
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGE' });
                }, 1000);
            }
        } catch (error) {
            dispatch({ type: 'LOGIN_ERROR', payload: { error: 'Error de red o del servidor' } });
            setTimeout(() => {
                dispatch({ type: 'CLEAR_MESSAGE' });
            }, 1000);
        }
    };

    const logout = async () => {
        dispatch({ type: 'LOGOUT', payload: { message: 'Sesión cerrada.' } });
        setTimeout(() => {
            dispatch({ type: 'CLEAR_MESSAGE' });
        }, 1000);
    };

    const getTasks = async (user_id) => {
        try {
            const response = await fetch(`https://didactic-guide-x5964qx4g6g43vr9-3001.app.github.dev/api/users/${user_id}/tasks`)
            if (response.ok) {
                const data = await response.json()
                dispatch({ type: 'GET_TASKS', payload: { tasks: data.tasks } })
            } else {
                const errorData = await response.json()
                dispatch({ error: errorData })
            }
        } catch (error) {
            dispatch({ error: error })
        }
    }
    const addTask = async (user_id, description) => {
        const newTask = {
            "description": description
        }
        try {
            const response = await fetch(`https://didactic-guide-x5964qx4g6g43vr9-3001.app.github.dev/api/users/${user_id}/tasks`, {
                method: ['POST'],
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
            if (response.ok) {
                const data = await response.json()
                dispatch({ type: 'ADD_TASK_SUCCESS', payload: { "task": data, message: 'Tarea añadida satisfactoriamente' } })
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGE' })
                }, 1000);
            } else {
                const errorData = await response.json()
                dispatch({ type: 'ADD_TASK_ERROR', payload: { error: errorData.error } })
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGE' })
                }, 1000);
            }
        } catch (error) {
            dispatch({ "error": error })
        }
    }
    const deleteTask = async (user_id, task_id) => {
        try {
            const response = await fetch(`https://didactic-guide-x5964qx4g6g43vr9-3001.app.github.dev/api/users/${user_id}/tasks/${task_id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                dispatch({ type: 'DELETE_TASK', payload: { message: 'Tarea eliminada correctamente.' } })
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGE' })
                }, 1000);
            } else {
                const errorData = await response.json()
                dispatch({ type: 'DELETE_TASK_ERROR', payload: { error: errorData } })
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGE' })
                }, 1000);
            }
        } catch (error) {
            dispatch({ type: 'DELETE_TASK_ERROR', payload: { error: error } })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_MESSAGE' })
            }, 1000);
        }
    }

    return (
        <AppContext.Provider value={{ state, dispatch, register, login, logout, getTasks, addTask, deleteTask }}>
            {children}
        </AppContext.Provider>
    );
};
