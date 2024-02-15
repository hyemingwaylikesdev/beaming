import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Carousel() {
  const imgArray = [...Array(5).keys()].map(
    (i) => `https://picsum.photos/800/300?random=${i}`,
  );

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {imgArray.map((img, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "100%", height: "100%", backgroundColor: "red" }}
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="custom-prev bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button className="custom-next bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
