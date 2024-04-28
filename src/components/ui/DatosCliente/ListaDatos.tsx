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
          <td>Dato</td>
        </tr>
        <tr>
          <td>Apellido</td>
          <td>Dato</td>
        </tr>
        <tr>
          <td>Documento</td>
          <td>Dato</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>Dato</td>
        </tr>
        <tr>
          <td>Teléfono</td>
          <td>Dato</td>
        </tr>
        <tr>
          <td>Domicilio</td>
          <td>Dato</td>
        </tr>
        <tr>
          <td>Cerrar Sesión</td>
          <td>Boton para salir</td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}


