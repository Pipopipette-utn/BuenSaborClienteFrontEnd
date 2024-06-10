import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import styles from "./Login.module.css";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../../redux/HookReducer";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/slices/Auth";
import { useForm } from "../../../hooks/useForm";

export const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: ""
  });
  const { email, password, nombre, apellido, direccion, telefono } = values;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: { email },
          clave: password,
          nombre,
          apellido,
          direccion,
          telefono
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el registro, vuelva a intentar");
      }

      const data = await response.json();
      dispatch(setLogin({ user: data.usuario.email, rol: data.usuario.rol }));
      navigate("/");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <span style={{ fontSize: "10vh" }} className="material-symbols-outlined">
          account_circle
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
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={nombre}
              name="nombre"
              type="text"
              placeholder="Nombre"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={apellido}
              name="apellido"
              type="text"
              placeholder="Apellido"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={direccion}
              name="direccion"
              type="text"
              placeholder="Dirección"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={telefono}
              name="telefono"
              type="text"
              placeholder="Teléfono"
            />
          </Form.Group>
          <Form.Check
            type="switch"
            onChange={() => setShowPass(!showPass)}
            id="custom-switch"
            label="Mostrar contraseña"
          />
          <div className="d-flex justify-content-center align-items-center mt-2">
            <Button type="submit" variant="primary">
              Registrarse
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
