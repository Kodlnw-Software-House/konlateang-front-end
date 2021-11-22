import { useState } from "react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import default_bg from "../../assets/bg_hospital.jpg";

const ImageSlider = (props) => {
  const [current, setCurrent] = useState(0);
  const length = props.index.length;
  const prev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const next = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  return (
    <section className="relative flex justify-center items-center h-80 overflow-hidden">
      <ArrowCircleLeftIcon
        className="w-10 absolute top-1/2 left-3 z-10 cursor-pointer select-none text-secondary md:left-4 hover:text-secondary-focus"
        onClick={prev}
      />
      <ArrowCircleRightIcon
        className="w-10 absolute top-1/2 right-3 z-10 cursor-pointer select-none text-secondary md:right-4 hover:text-secondary-focus"
        onClick={next}
      />
      {props.index.map((image, index) => {
        return (
          <div
            key={index}
            className={
              index === current
                ? "opacity-100 transition duration-500 ease-in-out"
                : "opacity-0 transition duration-500 ease-in-out"
            }
          >
            {index === current && (
              <img
                src={`${process.env.REACT_APP_BACKEND_MAIN_URL}hospital/getImage/${props.id}/${image}`}
                alt="slider"
                className="w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = default_bg;
                }}
              />
            )}
          </div>
        );
      })}
      {props.index.length === 0 && (
        <img src={default_bg} alt="slider" className="w-full h-auto" />
      )}
    </section>
  );
};
export default ImageSlider;
