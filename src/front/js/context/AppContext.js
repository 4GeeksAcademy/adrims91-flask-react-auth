import React, { createContext, useReducer } from "react";
import { initialState, AppReducer } from "./AppReducer";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const register = async (email, password) => {
        try {
            const response = await fetch('https://didactic-guide-x5964qx4g6g43vr9-3001.app.github.dev/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'REGISTER_SUCCESS', payload: { message: 'Usuario creado correctamente.' } });
                return data;
            } else {
                dispatch({ type: 'REGISTER_ERROR', payload: { error: data.error } });
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
            } else {
                const errorData = await response.json();
                dispatch({ type: 'LOGIN_ERROR', payload: { error: errorData.error } });
            }
        } catch (error) {
            dispatch({ type: 'LOGIN_ERROR', payload: { error: 'Error de red o del servidor' } });
        }
    };

    const logout = async () => {
        dispatch({ type: 'LOGOUT', payload: { message: 'Sesión cerrada.' } });
        setTimeout(() => {
            dispatch({ type: 'CLEAR_MESSAGE' });
        }, 1000);
    };

    return (
        <AppContext.Provider value={{ state, dispatch, register, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};
