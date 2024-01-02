const URL = "http://127.0.0.1:8888/todos";

export async function sendItemToBackend(item) {
	try {
		await fetch(URL, {
			method: "POST",
			body: JSON.stringify(item),
			headers: {
				"Content-type": "application/json",
			},
		});
	} catch (error) {
		console.error("Błąd wysyłania danych do backendu:", error);
	}
}

export async function getItemsFromBackend() {
	try {
		const res = await fetch(URL);
		const data = await res.json();
		return data.todoList;
	} catch (error) {
		console.error("Błąd pobierania danych:", error);
		throw error;
	}
}

export async function deleteItemFromBackend(id) {
	try {
		await fetch(`${URL}/${id}`, {
			method: "DELETE",
		});
	} catch (error) {
		console.error("Błąd wysyłania danych z backendu:", error);
	}
}

export async function patchItemToBackend(item) {
    try {
        await fetch(`${URL}/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ done: item.done }), 
        });
    } catch (error) {
        console.error("Błąd wysyłania danych do backendu:", error);
        throw error; 
    }
}




