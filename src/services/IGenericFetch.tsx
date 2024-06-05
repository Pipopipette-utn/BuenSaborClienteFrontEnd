// Clase abstracta que define métodos para operaciones CRUD en un servicio genérico
export interface IGenericFetch<T> {
	getAll(): Promise<T[]>;
	getById(id: number): Promise<T | null>;
	create(data: T): Promise<T>;
	update(id: number, data: T): Promise<T>;
	// Método abstracto para eliminar un elemento por su ID
	delete(id: number): Promise<void>;
}
