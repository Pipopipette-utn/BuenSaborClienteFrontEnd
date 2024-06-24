import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticulo, ICategoria, IEmpresa, ISucursal } from "../../types/empresa";
import { IPedidoDTO } from "../../types/dto";
import { loadState } from "../../utils/localStorage";

// Carga sucursal y categoria seleccionada desde localStorage si existe
const savedSelectedSucursal = loadState("selectedSucursal");
const savedSeledtedCategoria = loadState("selectedCategoria");

interface IInitialState {
	empresa: IEmpresa | null;
	sucursalesEmpresa: ISucursal[] | null;
	sucursal: ISucursal | null;
	categoriasSucursal: ICategoria[] | null;
	items: IArticulo[];
	selectedCategoria: ICategoria | null;
	pedido: IPedidoDTO | null;
}

const initialState: IInitialState = {
	empresa: null,
	sucursalesEmpresa: null,
	sucursal: savedSelectedSucursal ? savedSelectedSucursal : null,
	categoriasSucursal: null,
	items: [],
	selectedCategoria: savedSeledtedCategoria ? savedSeledtedCategoria : null,
	pedido: null,
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
			localStorage.setItem("selectedSucursal", JSON.stringify(action.payload))
		},
		setCategoriasSucursal: (state, action: PayloadAction<ICategoria[] | null>) => {
			state.categoriasSucursal = action.payload;
		},
		setCategoriaDefault: (state, action: PayloadAction<ICategoria>) =>{
			if (state.categoriasSucursal && action && action.payload) {
				state.categoriasSucursal[0] = action.payload;
			}
		},
		setArticulos: (state, action: PayloadAction<IArticulo[]>) => {
			state.items = action.payload;
		},
		setSelectedCategoria: (state, action: PayloadAction<ICategoria | null>) => {
			state.selectedCategoria = action.payload;
			localStorage.setItem("selectedCategoria", JSON.stringify(action.payload))
		},
		setNewPedido: (state, action: PayloadAction<IPedidoDTO | null>) => {
			state.pedido = action.payload;
			localStorage.setItem("SelectedDataSlice", JSON.stringify(state.pedido))
		},
	},
});

export const {
	setEmpresa,
	setSucursalesEmpresa,
	setSucursal,
	setCategoriasSucursal,
	setArticulos,
	setSelectedCategoria,
	setNewPedido,
	setCategoriaDefault
} = SelectedDataSlice.actions;
export default SelectedDataSlice.reducer;
