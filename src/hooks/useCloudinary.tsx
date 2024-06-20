import { useState, useEffect } from "react";

interface Imagen {
  url: string;
}

const useCloudinary = (imagenes: Imagen[]) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (imagenes && imagenes.length > 0) {
      const urls = imagenes.map((img) => img.url);
      setImageUrls(urls);
    }
  }, [imagenes]);

  return imageUrls;
};

export default useCloudinary;
