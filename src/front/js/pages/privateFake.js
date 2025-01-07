import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Pr1vate = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login')
        }, 2000);
        return () => clearTimeout(timer)
    }, [])
    return (
        <div>
            <h1 className="alert alert-danger text-center mt-5">Debes estar autenticado para entrar en la página privada.</h1>
        </div>
    )
}