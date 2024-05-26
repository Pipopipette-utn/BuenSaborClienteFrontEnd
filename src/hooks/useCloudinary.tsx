import { useState, useEffect } from "react";

const useCloudinary = (imagenes) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (imagenes && imagenes.length > 0) {
      const urls = imagenes.map((img) => img.url);
      setImageUrls(urls);
    }
  }, [imagenes]);

  return imageUrls;
};

export default useCloudinary;
