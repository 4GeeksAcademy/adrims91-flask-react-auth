import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Navbar = () => {
	const {state} = useContext(AppContext)
	return (
		<nav className="navbar">
			<div className="container-fluid">
				<Link className="btn btn-primary" to={"/"}>Home</Link>
				<div className="ml-auto">
					{!state.isAuthenticated ? <><Link className="btn btn-primary me-1" to={"/login"}>Login</Link>
					<Link className="btn btn-primary" to={"/register"}>Register</Link></> : ''}
					
				</div>
			</div>
		</nav>
	);
};
