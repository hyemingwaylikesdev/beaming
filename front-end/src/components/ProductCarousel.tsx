import { Carousel } from "react-responsive-carousel";

const ProductCarousel = ({ images }: { images: string[] }) => {
  return images.length !== 0 ? (
    <Carousel
      autoPlay
      showThumbs={false}
      infiniteLoop
      transitionTime={10}
      showArrows={false}
      showIndicators={false}
      interval={2000}
      showStatus={false}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="w-full h-full flex items-center justify-between md:max-h-[450px] lg:max-h-[650px]"
        >
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
            alt={image}
            className="w-full h-[400px] md:min-h-[450px] lg:min-h-[650px] object-cover object-center"
          />
        </div>
      ))}
    </Carousel>
  ) : (
    <div className="w-full h-64 bg-center bg-cover"></div>
  );
};

export default ProductCarousel;
