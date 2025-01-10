import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
	const { state, getTasks, addTask, deleteTask } = useContext(AppContext)
	const navigate = useNavigate()
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		if (!state.isAuthenticated) {
			navigate('/login');
		}
	}, [state.isAuthenticated])

	useEffect(() => {
		getTasks(state.id)
	}, [navigate, state.message, state.error])


	return (
		<>
			<div className="text-center mt-5">
				<p>Bienvenido/a a tu página privada {state.user}, estas son tus tareas:</p>
			</div>
			{state.tasks ? <div className="container">
				<ul className="list-group">
					{state.tasks.map(task => (
						<li key={task.id} className="list-group-item text-center mb-1">
							<i onClick={() => {
								const response = prompt('Deseas borrar esta tarea?')
								if (response.toLowerCase() === 'yes') {
									deleteTask(state.id, task.id)
								} else return
							}} className="fa-solid fa-minus me-3"></i>{task.description}
						</li>
					))}
				</ul>
				<input
					className="list-group-item text-center m-auto mt-5"
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Introduce una nueva tarea"
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							inputValue.trim()
							addTask(state.id, inputValue)
							setInputValue('')
							state.message = 'Tarea añadida satisfactoriamente'
						}
					}}
				></input>
				<div className="text-center mt-2">
					<button onClick={() => {
						addTask(state.id, inputValue)
						setInputValue('')
					}} className="btn btn-success">Añadir tarea</button>
					<p className="text-success">{state.message}</p>
					<p className="text-danger">{state.error}</p>
				</div>
			</div> : <><p className="text-center">No tienes tareas actualmente, quieres añadir una?</p>
				<input
					className="list-group-item text-center m-auto mt-5"
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Introduce una nueva tarea"
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							inputValue.trim()
							addTask(state.id, inputValue)
							setInputValue('')
							state.message = 'Tarea añadida satisfactoriamente'
						}
					}}
				></input><div className="text-center mt-2">
					<button onClick={() => {
						addTask(state.id, inputValue)
						setInputValue('')
					}} className="btn btn-success">Añadir tarea</button>
					<p className="text-success">{state.message}</p>
					<p className="text-danger">{state.error}</p>
				</div></>
			}
		</>
	);
};
