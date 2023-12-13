import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./TodoItem.module.css";

export function TodoItem({
	name,
	done,
	onDeleteButtonClick,
	onDoneButtonClick,
}) {
	const [isButtonShown, setIsButtonShown] = useState(true);
	const handleClick = () => {
		onDoneButtonClick();
		setIsButtonShown((prevIsButtonShown) => !prevIsButtonShown);
	};

	return (
		<li className={styles.item}>
			<span className={`${styles.name} ${done ? styles.done : ""}`}>
				{name}
			</span>

			<button
				className={`${styles.button} ${
					isButtonShown ? "" : styles.button__done
				}`}
				onClick={handleClick}
			>
				{isButtonShown ? "Zrobione" : "Anuluj"}
			</button>
			<Button className={styles.button} onClick={onDeleteButtonClick}>
				Usuń
			</Button>
		</li>
	);
}
