import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const Private = () => {
	const { state } = useContext(AppContext)
	return (
		<div className="text-center mt-5">
			<p>Welcome {state.user}</p>
		</div>
	);
};
