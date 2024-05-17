// Importamos el tipo de dato IDomicilio y la clase BackendClient
import { IDomicilio, ILocalidad } from "../types/ubicacion";
import { BackendClient } from "./BakendClient";

// Clase DomicilioService que extiende BackendClient para interactuar con la API de domiilios
export class DomicilioService extends BackendClient<IDomicilio> {

	async getAllMapped(localidades: ILocalidad[]):Promise<IDomicilio[]> {
		try {
			const domicilios = await this.getAll();
			
			const domiciliosMapeados = domicilios.map((domicilio) => {
				const localidad = localidades.find(
					(localidad: any) => localidad.id == domicilio.localidadId
				);
				return { ...domicilio, localidad: localidad };
			});
            
			return domiciliosMapeados; // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

}
