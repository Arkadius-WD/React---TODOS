import { useState, useEffect } from "react";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { getSubheading } from "./utils/getSubheading";
import {
	deleteItemFromBackend,
	getItemsFromBackend,
	sendItemToBackend,
} from "./utils/api";
import styles from "./App.module.css";

function generateUniqueId() {
	return new Date().getTime();
}

function App() {
	const [isFormShown, setIsFormShown] = useState(false);
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await getItemsFromBackend();
				setTodos(data);
			} catch (error) {
				console.error("Błąd pobierania danych:", error);
			}
		}
		fetchData();
	}, []);

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
		deleteItemFromBackend(id);
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
