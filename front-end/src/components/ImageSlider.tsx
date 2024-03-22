import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";

const ImageSlider = ({ images }: { images: string[] }) => {
  return (
    <Carousel
      autoPlay
      showThumbs={false}
      infiniteLoop
      transitionTime={0}
      showArrows={false}
      showIndicators={false}
      interval={2000}
      showStatus={false}
    >
      {images.map((image) => (
        <div key={image} className="w-full h-64">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
            alt={image}
            className="w-full min-h-[256px] object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
