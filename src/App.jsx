import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { getSubheading } from "./utils/getSubheading";

function generateUniqueId() {
	return new Date().getTime();
}

function sendItemToBackend(item) {
	fetch("http://127.0.0.1:8888/todos", {
		method: "POST",
		body: JSON.stringify(item),
		headers: {
			"Content-type": "application/json",
		},
	});
}

async function getItemsFromBackend() {
	const res = await fetch("http://127.0.0.1:8888/todos");
	return res.json();
}

function App() {
	const [isFormShown, setIsFormShown] = useState(false);
	const [todos, setTodos] = useState(() => {
		const storedTodos = JSON.parse(localStorage.getItem("todos"));

		return (
			storedTodos || [
				{ name: "Zapłacić rachunki", done: false, id: generateUniqueId() },
			]
		);
	});

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
		getItemsFromBackend(todos);
	}, [todos]);

	function addItem(newTodoName) {
		const newTodo = {
			name: newTodoName,
			done: false,
			id: generateUniqueId(),
		};
		setTodos((prevTodos) => [...prevTodos, newTodo]);
		setIsFormShown(false);
		sendItemToBackend(newTodo);
	}

	function deleteItem(id) {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	}

	function finishItem(id) {
		setTodos((prevTodos) =>
			prevTodos.map((todo) => {
				if (todo.id !== id) {
					return todo;
				}

				return {
					...todo,
					done: true,
				};
			})
		);
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div>
					<h1>Do zrobienia</h1>
					<h2>{getSubheading(todos.length)}</h2>
				</div>
				{!isFormShown && (
					<button
						onClick={() => setIsFormShown(true)}
						className={styles.button}
					>
						+
					</button>
				)}
			</header>
			{isFormShown && (
				<Form onFormSubmit={(newTodoName) => addItem(newTodoName)} />
			)}
			<ul>
				{todos.map(({ id, name, done }) => (
					<TodoItem
						key={id}
						name={name}
						done={done}
						onDeleteButtonClick={() => deleteItem(id)}
						onDoneButtonClick={() => finishItem(id)}
					/>
				))}
			</ul>
		</div>
	);
}

export default App;
