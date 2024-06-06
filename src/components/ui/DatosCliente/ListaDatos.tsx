import { Button } from '@mui/material';
import Table from 'react-bootstrap/Table';

export const ListaDatos = () => {
  return (
    <div>
        <Table striped bordered hover>
      <thead>
      </thead>
      <tbody>
        <tr>
          <td>Nombre</td>
          <td>Agustin</td>
        </tr>
        <tr>
          <td>Apellido</td>
          <td>Alvarez</td>
        </tr>
        <tr>
          <td>Documento</td>
          <td>42980761</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>agustinalvarez15@gmail.com</td>
        </tr>
        <tr>
          <td>Teléfono</td>
          <td>2616789102</td>
        </tr>
        <tr>
          <td>Domicilio</td>
          <td>Ayacucho 762</td>
        </tr>
        <tr>
          <Button>Cerrar Sesión</Button>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}


