import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsuario } from "../../types/empresa";

interface IInitialState {
	user: IUsuario | null;
	isLogged: boolean;
}

const initialState: IInitialState = {
	user: null,
	isLogged: false,
};

//acá definimos el estado global
const AuthUser = createSlice({
	name: "AuthUser",
	initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<IUsuario>) => {
			state.user = action.payload;
			state.isLogged = true;
		},
		setLogout: (state) => {
			state.user = null;
			state.isLogged = false;
		},
	},
});

export const { setLogin, setLogout } = AuthUser.actions;
export default AuthUser.reducer;
