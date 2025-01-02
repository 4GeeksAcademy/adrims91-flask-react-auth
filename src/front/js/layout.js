import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./component/navbar";
import { AppProvider } from "./context/AppContext";

import { Home } from "./pages/Home";
import { Private } from "./pages/private";
import { Private2 } from "./pages/privateFake";
import { Register } from "./component/Register";
import { Login } from "./component/Login";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <AppProvider>
                <Router basename={basename}>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Private />} path="/private" />
                        <Route element={<Private2/>} path="/private2" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                </Router>
            </AppProvider>
        </div>
    );
};

export default Layout;
