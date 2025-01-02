import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { state, login } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (state.isAuthenticated) {
            setTimeout(() => {
                navigate('/private')
            }, 1000);
        }
        if (state.error) {
            setTimeout(() => {
                navigate('/login')
            }, 1000);
        }
    }, [state]);


    return (
        <>
            <form
                className="text-center"
                onSubmit={e => {
                    e.preventDefault();
                    login(email, password);
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
                    value={"Login"}
                    type="submit"
                />
                {state.message && <div><p className="text-success">{state.message}</p></div>}
                {state.error && <div><p className="text-danger">{state.error}</p></div>}
            </form>
        </>
    )
}