import { IProvincia } from "../types/ubicacion";
import { BackendClient } from "./BackendClient";

export class ProvinciaService extends BackendClient<IProvincia> {
  /*
	async getAllMapped(paises: IPais[]):Promise<IProvincia[]> {
		try {
			const provincias = await this.getAll();
			
			const provinciasMapeadas = provincias.map((provincia) => {
				const pais = paises.find(
					(pais: any) => pais.id == provincia.pais_id
				);
				return { ...provincia, pais };
			});
            
			return provinciasMapeadas;
		} catch (error) {
			return Promise.reject(error); 
		}
	}
	*/
}
