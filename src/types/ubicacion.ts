import React from "react";

export interface IDomicilio extends BaseEntity {
	calle: string;
	numero?: number;
	cp?: number;
	piso?: number;
	nroDpto?: number;
	localidad?: ILocalidad;
}

export interface ILocalidad extends BaseEntity {
	nombre: string;
	provincia?: IProvincia;
}

export interface IProvincia extends BaseEntity {
	nombre: string;
	pais?: IPais;
}

export interface IPais extends BaseEntity {
	nombre: string;
}

export const UbicacionContext =
	React.createContext<UbicacionContextValues | null>(null);

export interface UbicacionContextValues {
	pais?: IPais;
	provincia?: IProvincia;
	localidad?: ILocalidad;
	onChangePais: (p: IPais) => void;
	onChangeProvincia: (p: IProvincia) => void;
	onChangeLocalidad: (l: ILocalidad) => void;
}