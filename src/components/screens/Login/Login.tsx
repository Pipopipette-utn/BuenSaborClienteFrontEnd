import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import styles from "./Login.module.css";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../../redux/HookReducer";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/slices/Auth";
import { useForm } from "../../../hooks/useForm";
import PersonIcon from "@mui/icons-material/Person";

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
      dispatch(setLogin({ user: data.usuario, rol: data.rol }));
      navigate("/");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <span style={{ fontSize: "10vh" }}>
          <PersonIcon fontSize="inherit" />{" "}
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
          <div className="d-flex justify-content-center align-items-center mt-2">
            <Button type="submit" variant="primary">
              Ingresar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
