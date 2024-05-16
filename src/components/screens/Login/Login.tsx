import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLogin } from "../../../redux/slices/Auth";
import MuiTextField from "@mui/material/TextField";
import {
	Box,
	InputAdornment,
	Link,
	Stack,
	Typography,
	styled,
} from "@mui/material";
import { theme } from "../../../styles/theme";
import StoreIcon from "@mui/icons-material/Store";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import MuiButton from "@mui/material/Button";
import { useState } from "react";

const TextFieldStyled = styled(MuiTextField)(({ theme }) => ({
	borderRadius: "50px",
	backgroundColor: "transparent",
	border: `1px solid ${theme.palette.bg.light}`,
	"& input": {
		color: theme.palette.bg.light,
		backgroundColor: "transparent",
		borderRadius: "50px",
	},
	"& input:-webkit-autofill": {
		backgroundColor: "transparent",
		borderRadius: "50px",
		color: "red",
	},
}));

const Button = styled(MuiButton)(({ theme }) => ({
	borderRadius: "50px",
	padding: "16.5px 14px",
	backgroundColor: theme.palette.bg.light,
	textTransform: "uppercase",
	color: theme.palette.info.main,
	"&:hover": {
		backgroundColor: theme.palette.bg.dark,
	},
}));

const OutlinedButton = styled(MuiButton)(({ theme }) => ({
	borderRadius: "50px",
	border: "1px solid white",
	padding: "16.5px 14px",
	textTransform: "uppercase",
	color: theme.palette.bg.light,
	"&:hover": {
		borderColor: theme.palette.primary.dark,
	},
}));

interface LoginValues {
	username: string;
	password: string;
}

export const Login = () => {
	const usuarios = useAppSelector((state) => state.business.usuarios);

	const [error, setError] = useState("");
	const initialValues = {
		username: "",
		password: "",
	};

	let loginSchema = Yup.object().shape({
		username: Yup.string().trim().required("Este campo es requerido."),
		password: Yup.string().required("Este campo es requerido."),
	});

	const navigate = useNavigate();
	// Obtención del despachador de acciones de Redux
	const dispatch = useAppDispatch();

	const handleSubmitForm = async (values: LoginValues) => {
		try {
			const userFound = usuarios!.find(
				(u: LoginValues) =>
					u.username === values.username && u.password === values.password
			);
			if (userFound) {
				setError("");
				dispatch(setLogin(userFound));
				navigate("/");
			} else {
				setError("Usuario o contraseña no encontrados.");
			}
		} catch (ex) {
			alert(ex);
		}
	};

	return (
		<Box
			className="box"
			sx={{
				width: "100%",
				backgroundColor: theme.palette.primary.main,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Stack
				direction="column"
				spacing={2}
				sx={{
					width: { mobile: "80%", xs: "60%", sm: "50%", md: "40%", xl: "30%" },
					alignItems: "center",
					pb: "3%",
				}}
			>
				<StoreIcon
					sx={{
						width: "160px",
						height: "160px",
						color: theme.palette.bg.light,
					}}
				/>
				<Formik
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={async (values) => await handleSubmitForm(values)}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						/* and other goodies */
					}) => (
						<>
							<TextFieldStyled
								fullWidth
								placeholder="NOMBRE DE USUARIO"
								name="username"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.username}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PersonOutlineOutlinedIcon
												sx={{ color: theme.palette.bg.light }}
											/>
										</InputAdornment>
									),
								}}
							/>
							{errors.username && touched.username && errors.username}
							<TextFieldStyled
								fullWidth
								placeholder="CONTRASEÑA"
								type="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<HttpsOutlinedIcon
												sx={{ color: theme.palette.bg.light }}
											/>
										</InputAdornment>
									),
								}}
							/>
							{errors.password && touched.password && errors.password}
							{error && (
								<Typography variant="body1" color={theme.palette.bg.light}>
									{error}
								</Typography>
							)}
							<Button
								fullWidth
								type="submit"
								disabled={isSubmitting}
								onClick={(event) => {
									event.preventDefault();
									handleSubmit();
								}}
							>
								Acceder
							</Button>
						</>
					)}
				</Formik>
				<OutlinedButton fullWidth startIcon={<GoogleIcon />}>
					Iniciar sesión con Google
				</OutlinedButton>
				<Stack sx={{ width: "100%", alignItems: "flex-end" }}>
					<Link>¿Olvidaste tu contraseña?</Link>
					<Link>Registrarse</Link>
				</Stack>
			</Stack>
		</Box>
	);
};
