import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticulo, ICategoria, IEmpresa, ISucursal } from "../../types/empresa";

interface IInitialState {
	empresa: IEmpresa | null;
	sucursalesEmpresa: ISucursal[] | null;
	sucursal: ISucursal | null;
	categoriasSucursal: ICategoria[] | null;
	items: IArticulo[];
	selectedCategoriaId: number | null;
}

const initialState: IInitialState = {
	empresa: null,
	sucursalesEmpresa: null,
	sucursal: null,
	categoriasSucursal: null,
	items: [],
	selectedCategoriaId: null
};

//acá definimos el estado global
const SelectedDataSlice = createSlice({
	name: "SelectedDataSlice",
	initialState,
	reducers: {
		setEmpresa: (state, action: PayloadAction<IEmpresa | null>) => {
			state.empresa = action.payload;
		},
		setSucursalesEmpresa: (state, action: PayloadAction<ISucursal[] | null>) => {
			state.sucursalesEmpresa = action.payload;
		},
		setSucursal: (state, action: PayloadAction<ISucursal | null>) => {
			state.sucursal = action.payload;
		},
		setCategoriasSucursal: (state, action: PayloadAction<ICategoria[] | null>) => {
			state.categoriasSucursal = action.payload;
		},
		setArticulos: (state, action: PayloadAction<IArticulo[]>) => {
			state.items = action.payload;
		},
		setSelectedCategoriaId: (state, action: PayloadAction<number | null>) => {
			state.selectedCategoriaId = action.payload;
		},
	},
});

export const {
	setEmpresa,
	setSucursalesEmpresa,
	setSucursal,
	setCategoriasSucursal,
	setArticulos,
	setSelectedCategoriaId
} = SelectedDataSlice.actions;
export default SelectedDataSlice.reducer;
