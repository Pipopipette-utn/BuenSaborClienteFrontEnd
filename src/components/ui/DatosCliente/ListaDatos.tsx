import { Button } from "@mui/material";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../../../redux/HookReducer";
import { RootState } from "../../../redux/Store";
import { setLogout } from "../../../redux/slices/Auth";

export const ListaDatos = () => {
  const cliente = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  if (!cliente) {
    return <div>Error no hay cliente</div>;
  }
  console.log("cliente: ", cliente);
  return (
    <div>
      <Table striped bordered hover>
        <thead></thead>
        <tbody>
          <tr>
            <td>Nombre</td>
            <td>{cliente.nombre}</td>
          </tr>
          <tr>
            <td>Apellido</td>
            <td>{cliente?.apellido}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{cliente?.usuario.email}</td>
          </tr>
          <tr>
            <td>Teléfono</td>
            <td>{cliente?.telefono}</td>
          </tr>
          <tr>
            <td>Domicilio</td>
            <td>
              {cliente?.domicilios[0].calle +
                " " +
                cliente.domicilios[0].numero}
            </td>{" "}
            {/** si agregamos comboBox de domicilio usar selectedDomicilioID o algo asi */}
          </tr>
        </tbody>
        <Button variant="contained" fullWidth>
          Cerrar Sesión
        </Button>
      </Table>
    </div>
  );
};
