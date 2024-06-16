import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/HookReducer";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/slices/Auth";
import { useForm } from "../../../hooks/useForm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { emptyLocalidad } from "../../../types/emptyEntities";
import { useFetch } from "../../../hooks/UseFetch";
import { setProvincias } from "../../../redux/slices/Location";
import { ILocalidad, IPais, IProvincia } from "../../../types/ubicacion";
import { baseUrl } from "../../../App";

export const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const steps = ["Datos personales", "Datos Usuario", "Direccion"];
  const { values, handleChange } = useForm({
    email: "",
    usuario: "",
    password: "",
    nombre: "",
    apellido: "",

    calle: "",
    numero: "",
    cp: "",
    piso: "",
    nroDpto: "",
    localidadId: "",
    provinciaId: "",
    paisId: "",

    fechaNacimiento: "",
    telefono: "",
  });
  const { data: paises } = useFetch("/paises");
  const [provincias, setProvincias] = useState<IProvincia[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

  const [selectedPais, setSelectedPais] = useState<IPais>();
  const [selectedProvincia, setSelectedProvincia] = useState<IProvincia>();
  const [selectedLocalidad, setSelectedLocalidad] = useState<ILocalidad>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("selected pais: ", selectedPais);
    if (selectedPais) {
      fetch(baseUrl + `/provincias/findByPais/${selectedPais}`)
        .then((response) => response.json())
        .then((data) => setProvincias(data));
    } else {
      setProvincias([]);
    }
  }, [selectedPais]);

  useEffect(() => {
    console.log("SelectedProvincia: ", selectedProvincia);
    if (selectedProvincia) {
      fetch(baseUrl + `/localidades/findByProvincia/${selectedProvincia}`)
        .then((response) => response.json())
        .then((data) => setLocalidades(data));
    } else {
      setLocalidades([]);
    }
  }, [selectedProvincia]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChangePais = (event: {
    target: { value: SetStateAction<IPais | undefined> };
  }) => {
    setSelectedPais(event.target.value);
  };

  const handleChangeLocalidad = (localidadId: number) => {
    console.log("coso que recibo: ", localidadId);
    const selectedLocalidad = localidades.find(
      (localidad) => localidad.id === localidadId
    );
    console.log("localidad ", selectedLocalidad);
    setSelectedLocalidad(selectedLocalidad);
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = {
        usuario: {
          email: values.email,
          username: values.usuario,
        },
        clave: values.password,
        nombre: values.nombre,
        apellido: values.apellido,
        telefono: values.telefono,
        fechaNacimiento: values.fechaNacimiento,
        domicilios: [
          {
            calle: values.calle,
            numero: parseInt(values.numero),
            cp: parseInt(values.cp),
            piso: parseInt(values.piso),
            nroDpto: parseInt(values.nroDpto),
            localidad: {
              id: selectedLocalidad?.id,
              provincia: {
                id: selectedProvincia,
                pais: {
                  id: selectedPais,
                },
              },
            },
          },
        ],
      };

      console.log("Datos a enviar:", userData);

      const response = await fetch("http://localhost:8080/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error en el registro, vuelva a intentar");
      }
      console.log("email: ", values.email);
      console.log("usuario: ", values.usuario);
      const data = await response.json();
      dispatch(
        setLogin({ email: data.usuario.email, username: data.usuario.username })
      );
      console.log("data mail: ", values.email);
      console.log("data usuario: ", values.usuario);
      navigate("/");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div style={{marginTop: "10%", padding: "5%"}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmitForm}>
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
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {activeStep === 2 && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="pais-label">País</InputLabel>
                  <Select
                    labelId="pais-label"
                    id="pais"
                    name="pais"
                    value={selectedPais}
                    onChange={handleChangePais}
                    fullWidth
                  >
                    {paises.map((pais) => (
                      <MenuItem key={pais.id} value={pais.id}>
                        {pais.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth disabled={!selectedPais}>
                  <InputLabel id="provincia-label">Provincia</InputLabel>
                  <Select
                    labelId="provincia-label"
                    id="provincia"
                    name="provincia"
                    value={selectedProvincia}
                    onChange={(e) => {
                      const { value } = e.target;
                      setSelectedProvincia(value);
                      handleChange({
                        target: {
                          name: "provincia",
                          value,
                        },
                      });
                    }}
                    fullWidth
                  >
                    {provincias.map((provincia) => (
                      <MenuItem key={provincia.id} value={provincia.id}>
                        {provincia.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth disabled={!selectedProvincia}>
                  <InputLabel id="localidad-label">Localidad</InputLabel>
                  <Select
                    labelId="localidad-label"
                    id="localidad"
                    name="localidad"
                    value={selectedLocalidad?.id || ""}
                    onChange={(e) =>
                      handleChangeLocalidad(Number(e.target.value))
                    }
                    fullWidth
                  >
                    {localidades.map((localidad) => (
                      <MenuItem key={localidad.id} value={localidad.id}>
                        {localidad.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Calle"
                  name="calle"
                  value={values.calle}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Número"
                  name="numero"
                  value={values.numero}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Código Postal"
                  name="cp"
                  value={values.cp}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Piso"
                  name="piso"
                  value={values.piso}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Número de Departamento"
                  name="nroDpto"
                  value={values.nroDpto}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Atrás
          </Button>
          {activeStep < steps.length - 1 && (
            <Button onClick={handleNext}>Siguiente</Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button variant="contained" color="primary" type="submit">
              Registrarse
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
