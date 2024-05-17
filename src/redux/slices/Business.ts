import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	IArticuloInsumo,
	IArticuloManufacturado,
	ICategoria,
	IEmpresa,
	ISucursal,
	IUnidadMedida,
	IUsuario,
} from "../../types/empresa";

interface IInitialState {
	usuarios: IUsuario[] | null;
	unidadMedidas: IUnidadMedida[] | null;
	empresas: IEmpresa[] | null;
	sucursales: ISucursal[] | null;
	categorias: ICategoria[] | null;
	articulosInsumos: IArticuloInsumo[] | null;
	articulosManufacturados: IArticuloManufacturado[] | null;
}

const initialState: IInitialState = {
	usuarios: null,
	unidadMedidas: null,
	empresas: null,
	sucursales: null,
	categorias: null,
	articulosInsumos: null,
	articulosManufacturados: null,
};

//acá definimos el estado global
const BusinessSlice = createSlice({
	name: "BusinessSlice",
	initialState,
	reducers: {
		setUsuarios: (state, action: PayloadAction<IUsuario[] | null>) => {
			state.usuarios = action.payload;
		},
		setUnidadMedidas: (
			state,
			action: PayloadAction<IUnidadMedida[] | null>
		) => {
			state.unidadMedidas = action.payload;
		},
		setEmpresas: (state, action: PayloadAction<IEmpresa[] | null>) => {
			state.empresas = action.payload;
		},
		setSucursales: (state, action: PayloadAction<ISucursal[] | null>) => {
			state.sucursales = action.payload;
		},
		setCategorias: (state, action: PayloadAction<ICategoria[] | null>) => {
			state.categorias = action.payload;
		},
		setArticulosInsumos: (
			state,
			action: PayloadAction<IArticuloInsumo[] | null>
		) => {
			state.articulosInsumos = action.payload;
		},
		setArticulosManufacturados: (
			state,
			action: PayloadAction<IArticuloManufacturado[] | null>
		) => {
			state.articulosManufacturados = action.payload;
		},
	},
});

export const {
	setUsuarios,
	setUnidadMedidas,
	setEmpresas,
	setSucursales,
	setCategorias,
	setArticulosInsumos,
	setArticulosManufacturados,
} = BusinessSlice.actions;
export default BusinessSlice.reducer;
