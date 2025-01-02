import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
	const { state } = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!state.isAuthenticated) {
			navigate('/login');
		}
	}, [state.isAuthenticated])
	

	return (
		<>
			<div className="text-center mt-5">
				<p>Bienvenido {state.user}</p>
			</div>
		</>
	);
};
