import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const { state, register } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (state.message) {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }, [state]);


    return (
        <>
            <div className="d-flex flex-column justify-content-center" style={{ height: '50vh' }}>
                <h1 className="text-center">Regístrate</h1>
                <form
                    className="text-center"
                    onSubmit={e => {
                        e.preventDefault();
                        register(email.toLowerCase(), password.toLowerCase());
                        setEmail("");
                        setPassword("");
                    }}>
                    <input
                        className="form-control mb-2 text-center w-50 m-auto"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        className="form-control mb-2 text-center w-50 m-auto"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Contraseña"
                    />
                    <input
                        className="btn btn-success"
                        value={"Crear usuario"}
                        type="submit"
                    />
                    {state.message && <div><p className="text-success">{state.message}</p></div>}
                    {state.error && <div><p className="text-danger">{state.error}</p></div>}
                </form>
            </div>
        </>
    )
}