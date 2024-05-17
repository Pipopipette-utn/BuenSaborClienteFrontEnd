export interface IDomicilio extends BaseEntity {
	calle: string;
	numero: number;
	cp: number;
	piso: number;
	nroDpto: number;
	localidad?: string;
	localidadId?: number;
}

export interface ILocalidad extends BaseEntity {
	nombre: string;
	provincia: IProvincia;
}

export interface IProvincia extends BaseEntity {
	nombre: string;
	pais: IPais;
}

export interface IPais extends BaseEntity {
	nombre: string;
}
