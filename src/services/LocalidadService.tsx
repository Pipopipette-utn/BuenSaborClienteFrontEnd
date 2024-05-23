// Importamos el tipo de dato IEmpresa y la clase BackendClient
import { ILocalidad } from "../types/ubicacion";
import { BackendClient } from "./BakendClient";

// Clase EmpresaService que extiende BackendClient para interactuar con la API de personas
export class LocalidadService extends BackendClient<ILocalidad> {
	/*
	async getAllMapped(provincias: IProvincia[]): Promise<ILocalidad[]> {
		try {
			const localidades = await this.getAll();

			const localidadesMapeadas = localidades.map((localidad) => {
				const provincia = provincias.find(
					(provincia: any) => provincia.id == localidad.provincia_id
				);
				return { ...localidad, provincia };
			});

			return localidadesMapeadas;
		} catch (error) {
			return Promise.reject(error);
		}
	}*/
}
