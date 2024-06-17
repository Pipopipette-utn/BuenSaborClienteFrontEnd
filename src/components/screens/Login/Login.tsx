import Form from "react-bootstrap/esm/Form";
import styles from "./Login.module.css";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../../redux/HookReducer";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/slices/Auth";
import { useForm } from "../../../hooks/useForm";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Stack } from "@mui/material";

export const Login = () => {
	const [showPass, setShowPass] = useState(false);
	const { values, handleChange } = useForm({
		email: "",
		password: "",
	});
	const { email, password } = values;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:8080/clientes/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, clave: password }),
			});

			if (!response.ok) {
				throw new Error("Usuario y/o Clave incorrectos, vuelva a intentar");
			}

			const data = await response.json();
			dispatch(setLogin(data));
			console.log("Usuario: ", data.usuario);
			console.log("Data: ", data);
			navigate("/");
		} catch (err) {
			alert((err as Error).message);
		}
	};

	return (
		<Stack className={styles.containerLogin}spacing={3}>
			<Stack sx={{ width: { xs: "90%" } }} className={styles.containerForm}>
				<span style={{ fontSize: "10vh" }}>
					<PersonIcon fontSize="inherit" />
					{/* si no usar style={{fontSize: "90px"}} */}
				</span>

				<Form onSubmit={handleSubmitForm}>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							onChange={handleChange}
							value={email}
							name="email"
							type="email"
							placeholder="Email"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							onChange={handleChange}
							value={password}
							name="password"
							type={showPass ? "text" : "password"}
							placeholder="Contraseña"
						/>
					</Form.Group>
					<Form.Check
						type="switch"
						onChange={() => setShowPass(!showPass)}
						id="custom-switch"
						label="Mostrar contraseña"
					/>
					<div className="d-flex justify-content-center align-items-center mt-4">
						<Button
							type="submit"
							variant="outlined"
              fullWidth
							sx={{
								border: "solid 1px white",
								borderRadius: "10px",
								p: 1,
								color: "white",
							}}
						>
							Ingresar
						</Button>
					</div>
				</Form>
			</Stack>
		</Stack>
	);
};
