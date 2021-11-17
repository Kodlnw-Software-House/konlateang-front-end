import { HomeIcon } from "@heroicons/react/solid";
import { useLocation } from "react-router";
import default_bg from "../../assets/bg_hospital.jpg";

const HospitalInformationCard = (props) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const images = [];
  for (let i = 0; i < props.image_index.length; i++) {
    images.push(
      <div
        key={i}
        id={`slide${i + 1}`}
        className="relative w-full carousel-item"
      >
        <img
          alt={`pic${i + 1}`}
          src={`${process.env.REACT_APP_BACKEND_MAIN_URL}hospital/getImage/${props.id}/${props.image_index[i]}`}
          className="object-contain object-center w-full h-80"
        />

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href={
              props.imageCount === 1
                ? `${currentPath}#slide1`
                : props.imageCount === 2
                ? `${currentPath}#slide2`
                : `${currentPath}#slide3`
            }
            className="btn btn-circle"
          >
            ❮
          </a>
          <a href={`${currentPath}#slide2`} className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    );
  }
  if (props.image_index.length === 0) {
    images.push(
      <div id={`slide1`} className="relative w-full carousel-item">
        <img
          key="default_img"
          alt={`pic1`}
          src={default_bg}
          className="object-contain object-center w-full h-80"
        />
      </div>
    );
  }
  return (
    <div
      className="mx-auto overflow-hidden bg-white rounded-lg lg:grid-flow-col lg:grid lg:grid-cols-2 lg:gap-x-4
    lg:justify-items-center xl:h-auto xl:place-content-center"
    >
      <div className="xl:justify-self-end xl:w-full">
        {/* Picture */}
        <div className="w-full carousel">{images}</div>
      </div>
      {/* Hospital Info */}
      <div className="xl:justify-self-start xl:w-full">
        <div className="flex items-center px-6 py-3 bg-primary">
          <HomeIcon
            className="w-6 h-6 text-primary-content fill-current"
            xmlns="http://www.w3.org/2000/svg"
          />
          <h1 className="mx-3 text-xl text-primary-content md:text-2xl">
            {props?.community_isolation_name} <br /> {props?.hospital_name}
          </h1>
        </div>

        <div className="px-6 py-4 lg:px-1">
          <h1 className="text-lg font-semibold text-gray-800 md:text-2xl">
            จำนวนเตียงคงเหลือ{" "}
            <span className="badge badge-primary badge-lg text-xl">
              {props?.bed_left} เตียง
            </span>
          </h1>
          <h1 className="text-base font-semibold text-gray-800 md:text-xl">
            จากทั้งหมด{" "}
            <span className="badge badge-primary badge-outline badge-md text-base">
              {props?.available_bed} เตียง
            </span>
          </h1>
          <p className="py-2 text-gray-700 text-lg md:text-xl">
            {props?.address}
          </p>
        </div>

        {localStorage.getItem("role") === "PATIENT" && (
          <div>
            <button
              className="btn btn-success btn-block text-lg btn-lg"
              onClick={props.openModal}
            >
              จองเตียงศูนย์พักคอย/โรงพยาบาลนี้
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default HospitalInformationCard;
