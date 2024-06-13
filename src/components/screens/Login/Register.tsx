import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../../redux/HookReducer";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/slices/Auth";
import { useForm } from "../../../hooks/useForm";

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Grid,
  TextField,
} from "@mui/material";

export const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Datos personales", "Datos Usuario", "Direccion"];
  const { values, handleChange } = useForm({
    email: "",
    usuario: "",
    password: "",
    nombre: "",
    apellido: "",
    domicilios: "",
    fechaNacimiento: "",
    telefono: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAddDomicilio = () => {
    handleChange({
      target: {
        name: "domicilios",
        value: [
          ...values.domicilios,
          {
            calle: "",
            numero: "",
            cp: "",
            piso: "",
            nroDpto: "",
            localidad: "",
          },
        ],
      },
    });
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: { email: values.email, username: values.usuario },
          clave: values.password,
          nombre: values.nombre,
          apellido: values.apellido,
          telefono: values.telefono,
          fechaNacimiento: values.fechaNacimiento,
          domicilios: values.domicilios,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el registro, vuelva a intentar");
      }
      //dispatch(setLogin({ email: values.email, username: values.usuario }));
      console.log("email: ", values.email);
      console.log("usuario: ", values.usuario);
      const data = await response.json();
      dispatch(
        setLogin({ email: data.usuario.email, username: data.usuario.username })
      );
      console.log("data mail: ", values.email);
      console.log("data usuario: ", values.usuario);
      //navigate("/");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmitForm}>
        {/* Renderiza los campos del formulario según el activeStep */}

        {activeStep === 0 && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nombre"
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Apellido"
                  name="apellido"
                  value={values.apellido}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Teléfono"
                  name="telefono"
                  value={values.telefono}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={values.fechaNacimiento}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {activeStep === 1 && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Usuario"
                  name="usuario"
                  value={values.usuario}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {activeStep === 2 && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField />
              </Grid>
            </Grid>
          </Box>
        )}
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Atrás
        </Button>
        {activeStep < steps.length - 1 && (
          <Button onClick={handleNext}>siguiente</Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button variant="contained" color="primary" type="submit">
            Registrarse
          </Button>
        )}
      </form>
    </div>
  );
};
