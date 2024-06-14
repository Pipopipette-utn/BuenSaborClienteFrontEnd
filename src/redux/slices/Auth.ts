import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICliente, IUsuario } from "../../types/usuario";
import { loadState } from "../../utils/localStorage";

const savedUser = loadState("AuthUser")

interface IInitialState {
	user: ICliente | null;
	isLogged: boolean;
}

const initialState: IInitialState = {
	user: savedUser ? savedUser.user : null,
	isLogged: savedUser ? savedUser.isLogged : false,
};

//acá definimos el estado global
const AuthUser = createSlice({
	name: "AuthUser",
	initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<ICliente>) => {
			state.user = action.payload;
			state.isLogged = true;
			localStorage.setItem("AuthUser", JSON.stringify(state));
		},
		setLogout: (state) => {
			state.user = null;
			state.isLogged = false;
			localStorage.setItem("AuthUser", JSON.stringify(state));
		},
	},
});

export const { setLogin, setLogout } = AuthUser.actions;
export default AuthUser.reducer;
