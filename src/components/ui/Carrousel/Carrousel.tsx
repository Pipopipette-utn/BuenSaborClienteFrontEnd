import { Carousel as CarouselComponent } from "react-bootstrap";
import "./Carousel.css";

function Carousel() {
  return (
    <CarouselComponent fade>
      <CarouselComponent.Item className="imgSlider">
        <img
          className="d-block w-100 carousel-image"
          src="https://i0.wp.com/www.thursdaynightpizza.com/wp-content/uploads/2022/06/veggie-pizza-side-view-out-of-oven.png?w=1200&ssl=1"
          alt="First slide"
        />
      </CarouselComponent.Item>
      <CarouselComponent.Item className="imgSlider">
        <img
          className="d-block w-100 carousel-image"
          src="https://www.dondeir.com/wp-content/uploads/2023/01/cheesee-el-pariaso-de-las-sliders-.jpg"
          alt="Second slide"
        />
      </CarouselComponent.Item>
      <CarouselComponent.Item className="imgSlider">
        <img
          className="d-block w-100 carousel-image"
          src="https://www.espectacular.com.ar/u/fotografias/m/2023/9/23/f1280x720-62955_194630_5050.jpg"
          alt="Third slide"
        />
      </CarouselComponent.Item>
    </CarouselComponent>
  );
}

export default Carousel;
