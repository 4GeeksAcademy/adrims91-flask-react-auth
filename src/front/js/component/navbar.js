import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Navbar = () => {
	const { state, logout } = useContext(AppContext)


	return (
		<nav className="navbar">
			<div className="container-fluid">
				{state.isAuthenticated ? <><div><Link className="btn btn-primary me-1" to={"/"}>Home</Link><Link className="btn btn-success" to={"/private"}>Privado</Link></div></> : <Link className="btn btn-danger" to={"/pr1vate"}>Privado</Link>}
				<div className="ml-auto">
					{!state.isAuthenticated ? <><Link className="btn btn-primary me-1" to={"/login"}>Acceder</Link>
						<Link className="btn btn-primary" to={"/register"}>Regístrate</Link></> : <><button onClick={logout} className="btn btn-danger text-center">Cerrar sesión</button></>}
				</div>
			</div>
		</nav>
	);
};
