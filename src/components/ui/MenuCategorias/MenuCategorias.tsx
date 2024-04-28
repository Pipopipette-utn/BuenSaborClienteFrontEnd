import React from 'react';
import { Nav, Col } from 'react-bootstrap';

interface Categoria {
  id: number;
  name: string;
}

interface Props {
    categorias: Categoria[];
}

export const MenuCategoria: React.FC<Props> = ({ categorias }) => {
  return (
    <Col md={3} className="bg-light">
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link disabled>Categorías</Nav.Link>
          {categorias.map((categoria) => (
            <Nav.Link key={categoria.id} href={`#${categoria.name}`} className="pl-4">
              {categoria.name}
            </Nav.Link>
          ))}
        </Nav.Item>
      </Nav>
    </Col>
  );
};

