import React, { useState, useEffect } from "react";
import { fetchToDo, deleteToDo, addToDo, deleteUsers, addUser } from "../fetchApi";



//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDos, setToDos] = useState([]);

	useEffect(() => {
		fetchToDo(setToDos);
	}, [] )

	const handleAddToDo = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "")  {
			// setToDos([...toDos, inputValue.trim()])
			
			addToDo(inputValue, setToDos)
			setInputValue("");
		};
	};
	const handleDeleteToDo = (index) => {
		// setToDos(toDos.filter((todo, i) => index !== i))
		const todoId = toDos[index].id;
		const deletedTodo = toDos[index].label;

		deleteToDo(setToDos, todoId, deletedTodo)
	}
	return (
		<div className=" container">
			<h1 className="text-center mt-4">Todo's</h1>
			<div className="card mx-auto" style={{ maxWidth: "800px" }}>
				<ul className="list-group list-group-flush d-flex align-items-center">
					<li className="list-group-item d-flex justify-content-center w-100">
						<input
							type="text"
							placeholder="What needs to be done?"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleAddToDo}
							
						/>
					</li>
					{toDos.length === 0 ? (
						<li className="list-group-item">No tasks, Add a task</li>
					) : (
						toDos.map((todo, index) => (
							<li className="list-group-item w-100 d-flex justify-content-center" key={todo.id}>
								<div className="list-item-todo">{todo.label}</div>
								<span className="x-container" onClick={() => handleDeleteToDo(index)}>
									<i className="fa-solid fa-x"></i>
								</span>
							</li>

						))
					)}
					
				</ul>
				<div className="card-footer text-secondary" >
					{toDos.length} {toDos.length === 1 ? "item" : "items"} left
				</div>
			</div>
			<div className="d-flex justify-content-center mt-3">
				<button className="btn btn-success me-3" onClick={() => addUser(setToDos)}>Add New User</button>
				<button className="btn btn-danger" onClick={() => deleteUsers(setToDos)}>Delete User</button>
			</div>
		</div>
	);
};

export default Home;

