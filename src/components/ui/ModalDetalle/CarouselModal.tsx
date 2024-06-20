import { useState } from "react";
import styles from "./Carousel.module.css";
import CardMedia from "@mui/material/CardMedia";

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((url: string, index: number) => (
          <CardMedia
            key={index}
            component="img"
            className={styles.carouselImage}
            image={url}
            alt={`Image ${index + 1}`}
          />
        ))}
      </div>
      <button
        className={`${styles.carouselButton} ${styles.prev}`}
        onClick={handlePrev}
      >
        {"<"}
      </button>
      <button
        className={`${styles.carouselButton} ${styles.next}`}
        onClick={handleNext}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
