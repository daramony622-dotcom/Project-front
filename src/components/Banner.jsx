import { useEffect, useState } from "react";
import Banshoes from "../assets/images/Banshoes.png";
import Banshirt from "../assets/images/Banshirt.png";
import Banhood from "../assets/images/Banhood.png";
import { Link } from "react-router-dom";
const slides = [
  {
    id: 1,
    title: "Shoes Collections",
    img: Banshoes,
    btnText: "Shop Now",
  },
  {
    id: 2,
    title: "Short Clothing",
    img: Banshirt,
    btnText: "Shop Sale",
  },
  {
    id: 3,
    title: "New Trend Hoods",
    img: Banhood,
    btnText: "Explore More",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative w-full h-[340px] overflow-hidden rounded-2xl sm:h-[430px] lg:h-[520px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-all duration-700
          ${
            index === current
              ? "opacity-100 translate-x-0 z-10"
              : index < current
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
          }`}>
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 text-white sm:px-10 md:px-20">
            <h1 className="mb-4 max-w-[90%] text-3xl leading-tight font-bold sm:max-w-[80%] sm:text-5xl md:text-6xl">
              {slide.title}
            </h1>

            <button className="w-fit rounded-lg bg-white px-5 py-2.5 text-base font-semibold text-black transition hover:scale-105 sm:px-6 sm:py-3">
              <Link to="/menu">{slide.btnText}</Link>
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white sm:left-4 sm:p-3">
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white sm:right-4 sm:p-3">
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-3 sm:bottom-5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300
              ${
                current === index ? "w-8 h-3 bg-white" : "w-3 h-3 bg-white/50"
              }`}></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
