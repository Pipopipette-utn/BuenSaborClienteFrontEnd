import { useState } from "react";
import { ILocalidad, IPais, IProvincia } from "../types/ubicacion";


export const useUbicacion = (
	selectedPais?: IPais,
	selectedProvincia?: IProvincia,
	selectedLocalidad?: ILocalidad
) => {
	const [pais, setPais] = useState<IPais | undefined>(selectedPais);
	const [provincia, setProvincia] = useState<IProvincia | undefined>(
		selectedProvincia
	);
	const [localidad, setLocalidad] = useState<ILocalidad | undefined>(
		selectedLocalidad
	);

	const onChangePais = (pais: IPais) => {
		setPais(pais);
	};

	const onChangeProvincia = (provincia: IProvincia) => {
		setProvincia(provincia);
	};

	const onChangeLocalidad = (localidad: ILocalidad) => {
		setLocalidad(localidad);
	};

	return {
		pais,
		provincia,
		localidad,
		onChangePais,
		onChangeProvincia,
		onChangeLocalidad,
	};
};
