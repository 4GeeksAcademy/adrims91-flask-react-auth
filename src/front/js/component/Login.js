import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";

export const Login = () => {
    const { state, login } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (state.isAuthenticated) {
            setTimeout(() => {
                navigate('/private')
            }, 1000);
        }
    }, [state]);


    return (
        <>
            {loading ? <Loading /> : <>
                <div className="d-flex flex-column justify-content-center" style={{ height: '50vh' }}>
                    <h1 className="text-center">Acceder</h1>
                    <form
                        className="text-center"
                        onSubmit={e => {
                            e.preventDefault();
                            setLoading(true);
                            login(email, password)
                                .finally(() => {
                                    setLoading(false);
                                    setEmail("");
                                    setPassword("");
                                });
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
                            value={"Acceder"}
                            type="submit"
                        />
                        {state.message && <div><p className="text-success">{state.message}</p></div>}
                        {state.error && <div><p className="text-danger">{state.error}</p></div>}
                    </form>
                </div>
            </>
            }
        </>
    )
}