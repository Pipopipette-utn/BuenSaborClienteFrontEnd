import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	IDomicilio,
	ILocalidad,
	IPais,
	IProvincia,
} from "../../types/ubicacion";

interface IInitialState {
	pais: IPais | null;
	provincia: IProvincia | null;
	localidad: ILocalidad | null;
	domicilios: IDomicilio[] | null;
}

const initialState: IInitialState = {
	pais: null,
	provincia: null,
	localidad: null,
	domicilios: null,
};

//acá definimos el estado global
const UbiSlice = createSlice({
	name: "UbiSlice",
	initialState,
	reducers: {
		setPais: (state, action: PayloadAction<IPais | null>) => {
			state.pais = action.payload;
		},
		setProvincia: (state, action: PayloadAction<IProvincia | null>) => {
			state.provincia = action.payload;
		},
		setLocalidad: (state, action: PayloadAction<ILocalidad | null>) => {
			state.localidad = action.payload;
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

export const { setPais, setProvincia, setLocalidad, setDomicilios, addDomicilio } =
UbiSlice.actions;
export default UbiSlice.reducer;
