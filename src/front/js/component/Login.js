import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export const Login = () => {
    const { state, login } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (state.isAuthenticated) {
            setTimeout(() => {
                window.location.href = "/private";
            }, 2000);
        }
        if (state.error) {
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
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