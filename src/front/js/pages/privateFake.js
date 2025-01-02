import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private2 = () => {
    const navigate = useNavigate()
    useEffect(() => {
        alert('Donde creías que ibas? Inicia sesión primero ;)')
        const timer = setTimeout(() => {
            navigate('/login')
        }, 2000);
        return () => clearTimeout(timer)
    }, [])
    return (
        <div>
            <h1>Prueba de nuevo</h1>
        </div>
    )
}