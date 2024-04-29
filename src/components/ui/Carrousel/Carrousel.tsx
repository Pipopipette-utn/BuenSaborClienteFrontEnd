import Carousel from "react-bootstrap/Carousel";

//colocar imagenes y agrgar mas items

function Carrousel() {
  return (
    <Carousel slide={false}>
      <Carousel.Item>
        <a>Holaaa soy un item</a>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrousel;
