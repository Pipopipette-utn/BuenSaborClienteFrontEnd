import { IGenericFetch } from "./IGenericFetch";

export abstract class BackendClient<T> implements IGenericFetch<T> {
	protected baseUrl: string = import.meta.env.VITE_API_URL || "";

	constructor(baseUrl: string) {
		this.baseUrl += baseUrl;
	}

	async getAllActive(): Promise<T[]> {
		try {
			const response = await fetch(`${this.baseUrl}/active`);
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json(); // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	// Función generica para obtener datos mediante una solicitud GET
	async getAll(): Promise<T[]> {
		try {
			const response = await fetch(`${this.baseUrl}`);
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json(); // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	async getById(id: number): Promise<T | null> {
		try {
			const response = await fetch(`${this.baseUrl}/${id}`);
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json(); // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	// Función generica para enviar datos mediante una solicitud POST
	async create(data: T): Promise<T> {
		try {
			const response = await fetch(`${this.baseUrl}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data), // Convierte los datos a JSON y los envía en el cuerpo de la solicitud
			});
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json(); // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	// Función generica para actualizar datos mediante una solicitud PUT
	async update(id: number, data: T): Promise<T> {
		try {
			const response = await fetch(`${this.baseUrl}/${id}`, {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data), // Convierte los datos a JSON y los envía en el cuerpo de la solicitud
			});

			if (!response.ok) {
				console.log(response);
				throw Error(response.statusText);
			}
			return response.json(); // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	// Función generica para eliminar datos mediante una solicitud DELETE
	async delete(id: number) {
		try {
			const response = await fetch(`${this.baseUrl}/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw Error(response.statusText);
			}
		} catch (error) {
			console.error(error); // Imprime el error en la consola
		}
	}
}
