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
            <form
                className="text-center"
                onSubmit={e => {
                    e.preventDefault();
                    register(email, password);
                    setEmail("");
                    setPassword("");
                }}>
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input
                    value={"Create user"}
                    type="submit"
                />
                {state.message && <div><p className="text-success">{state.message}</p></div>}
                {state.error && <div><p className="text-danger">{state.error}</p></div>}
            </form>
        </>
    )
}