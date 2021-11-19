import { HomeIcon } from "@heroicons/react/solid";
import { useLocation } from "react-router";
import ImageSlider from "../ui/ImageSlider";

const HospitalInformationCard = (props) => {

  return (
    <div
      className="overflow-hidden bg-white rounded-lg lg:grid-flow-col lg:grid lg:grid-cols-2 lg:gap-x-4
    lg:justify-items-center xl:h-auto xl:place-content-center"
    >
      <div className="xl:justify-self-end xl:w-full">
        {/* Picture */}
        <ImageSlider index={props.image_index} id={props.id} />
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
          <h1 className="text-base font-semibold text-gray-800 md:text-2xl">
            จำนวนเตียงคงเหลือ{" "}
            <span className="badge badge-primary badge-lg text-lg">
              {props?.bed_left} เตียง
            </span>
          </h1>
          <h1 className="text-base font-semibold text-gray-800 md:text-xl">
            จากทั้งหมด{" "}
            <span className="badge badge-primary badge-outline badge-md text-lg">
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
              className="btn btn-success btn-block text-base md:text-xl btn-lg"
              onClick={props.openModal}
            >
              จองเตียงศูนย์พักคอยนี้
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default HospitalInformationCard;
