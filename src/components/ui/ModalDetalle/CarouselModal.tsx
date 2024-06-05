import { useState } from "react";
import styles from "./Carousel.module.css";
import CardMedia from "@mui/material/CardMedia";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((url, index) => (
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
