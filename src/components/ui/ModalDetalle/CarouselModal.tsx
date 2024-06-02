import CarouselComponent from 'react-bootstrap/Carousel'; 

function Carousel({ imageUrls }) {
    
  return (
    <CarouselComponent fade>
      {imageUrls.map((url, index) => (
        <CarouselComponent.Item className="imgSlider" key={index}>
          <img
            className="d-block w-100 carousel-image"
            src={url}
            alt={`Slide ${index + 1}`}
          />
        </CarouselComponent.Item>
      ))}
    </CarouselComponent>
  );
}

export default Carousel;
