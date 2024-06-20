import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
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

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={8}>
          <Table striped bordered hover responsive>
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
                </td>
              </tr>
            </tbody>
          </Table>
          <Button variant="contained" onClick={handleLogout} className="w-100">
            Cerrar Sesión
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
