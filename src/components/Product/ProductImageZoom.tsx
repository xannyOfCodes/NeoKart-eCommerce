import React, { useState } from 'react';

type Props = {
  images: string[];
  alt?: string;
};

const ProductImageZoom: React.FC<Props> = ({ images, alt }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => setIsZoomed(prev => !prev);

  return (
    <div>
      {/* Main Image */}
      <img
        src={activeImage}
        alt={alt}
        onClick={toggleZoom}
        className="w-full h-auto object-contain rounded cursor-zoom-in"
      />

      {/* Zoomed Image (optional fullscreen or modal) */}
      {isZoomed && (
        <div onClick={toggleZoom}>
          <img src={activeImage} alt={alt} className="w-full h-auto absolute" />
        </div>
      )}

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => setActiveImage(img)}
            className={`w-16 h-16 object-cover cursor-pointer rounded border
              ${img === activeImage ? 'border-black' : 'border-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageZoom;
