
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react'; // Import useState for state management

function ProductCard({ nombre, imagen, descripcion }) {
  const [quantity, setQuantity] = useState(1); // Initial quantity state

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) { // Ensure positive quantity
      setQuantity(newQuantity);
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imagen} />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>

        {/* Quantity selection */}
        <div className="quantity-selector">
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1" // Set minimum quantity to 1
          />
        </div>

        <Button variant="primary">Agregar al carrito ({quantity})</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;