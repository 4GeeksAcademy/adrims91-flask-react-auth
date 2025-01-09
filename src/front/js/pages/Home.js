import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";


export const Home = () => {
    const navigate = useNavigate();
    const { state } = useContext(AppContext);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/login");
        }
    }, [state]);

    return (
        <>
            <div className="text-center mt-5">
                <h1>Bienvenido/a a Home</h1>
            </div>
        </>
    );
}