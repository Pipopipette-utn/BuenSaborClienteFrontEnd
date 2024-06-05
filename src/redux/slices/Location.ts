import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	IDomicilio,
	ILocalidad,
	IPais,
	IProvincia,
} from "../../types/ubicacion";

interface IInitialState {
	paises: IPais[] | null;
	provincias: IProvincia[] | null;
	localidades: ILocalidad[] | null;
	domicilios: IDomicilio[] | null;
}

const initialState: IInitialState = {
	paises: null,
	provincias: null,
	localidades: null,
	domicilios: null,
};

//acá definimos el estado global
const LocationSlice = createSlice({
	name: "LocationSlice",
	initialState,
	reducers: {
		setPaises: (state, action: PayloadAction<IPais[] | null>) => {
			state.paises = action.payload;
		},
		setProvincias: (state, action: PayloadAction<IProvincia[] | null>) => {
			state.provincias = action.payload;
		},
		setLocalidades: (state, action: PayloadAction<ILocalidad[] | null>) => {
			state.localidades = action.payload;
		},
		setDomicilios: (state, action: PayloadAction<IDomicilio[] | null>) => {
			state.domicilios = action.payload;
		},
		addDomicilio: (state, action: PayloadAction<IDomicilio | null>) => {
			if (action.payload) {
				if (state.domicilios) {
					state.domicilios.push(action.payload);
				} else {
					state.domicilios = [action.payload];
				}
			}
		},
	},
});

export const { setPaises, setProvincias, setLocalidades, setDomicilios } =
	LocationSlice.actions;
export default LocationSlice.reducer;
