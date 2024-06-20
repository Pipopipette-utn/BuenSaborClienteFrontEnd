import React from "react";
import { Nav, Col, Row } from "react-bootstrap";

interface Categoria {
  id: number;
  name: string;
}

interface Props {
  categorias: Categoria[];
}

export const MenuCategoria: React.FC<Props> = ({ categorias }) => {
  return (
    <Row>
      <Col xs={12} md={3} className="bg-light p-3">
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link disabled>Categorías</Nav.Link>
            {categorias.map((categoria) => (
              <Nav.Link
                key={categoria.id}
                href={`#${categoria.name}`}
                className="pl-md-4"
              >
                {categoria.name}
              </Nav.Link>
            ))}
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  );
};
