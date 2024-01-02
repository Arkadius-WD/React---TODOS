import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import styles from "./TodoItem.module.css";

export function TodoItem({
	name,
	done: initialDone,
	onDeleteButtonClick,
	onDoneButtonClick,
}) {
	const [done, setDone] = useState(initialDone);

	useEffect(() => {
		setDone(initialDone);
	}, [initialDone]);

	const handleClick = () => {
		onDoneButtonClick();
	};

	return (
		<li className={styles.item}>
			<span className={`${styles.name} ${done ? styles.done : ""}`}>
				{name}
			</span>

			<button
				className={`${styles.button} ${done ? styles.button__done : ""}`}
				onClick={handleClick}
			>
				{done ? "Anuluj" : "Zrobione"}
			</button>
			<Button className={styles.button} onClick={onDeleteButtonClick}>
				Usuń
			</Button>
		</li>
	);
}
