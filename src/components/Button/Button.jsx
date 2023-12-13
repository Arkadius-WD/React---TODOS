import styles from "./Button.module.css";

export function Button({ onClick, children }) {
	return (
		<button className={styles.button} onClick={onClick}>
			{children}
		</button>
	);
}
