import { Carousel as CarouselComponent } from "react-bootstrap";
import "./Carousel.css";

function Carousel() {
	return (
		<CarouselComponent style={{ minHeight: "400px" }}>
			<CarouselComponent.Item className="imgSlider">
				<img
					className="d-block w-100 carousel-image"
					src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
					alt="First slide"
					style={{
						objectFit: "cover",
						objectPosition: "center",
						height: "100%",
					}}
				/>
			</CarouselComponent.Item>
			<CarouselComponent.Item className="imgSlider">
				<img
					className="d-block w-100 carousel-image"
					src="https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
					alt="Second slide"
					style={{
						objectFit: "cover",
						objectPosition: "center",
						height: "100%",
					}}
				/>
			</CarouselComponent.Item>
			<CarouselComponent.Item className="imgSlider">
				<img
					className="d-block w-100 carousel-image"
					src="https://images.pexels.com/photos/2235832/pexels-photo-2235832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
					alt="Third slide"
					style={{
						objectFit: "cover",
						objectPosition: "center",
						height: "100%",
					}}
				/>
			</CarouselComponent.Item>
		</CarouselComponent>
	);
}

export default Carousel;
