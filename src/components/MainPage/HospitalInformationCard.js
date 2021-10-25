import { HomeIcon } from "@heroicons/react/solid";
import default_image from "../../assets/bg_hospital.jpg";
import { useLocation } from "react-router";
const HospitalInformationCard = (props) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div
      className="mx-auto overflow-hidden bg-white rounded-lg lg:grid-flow-col lg:grid lg:grid-cols-2 lg:gap-x-4
    lg:justify-items-center xl:h-96 xl:place-content-center"
    >
      <div className="xl:justify-self-end xl:w-full">
        {/* Picture */}
        <div className="w-full carousel">
          <div id="item1" className="w-full carousel-item">
            <img
              alt="picture_1"
              src={default_image}
              className="object-cover object-center w-full h-64"
            />
          </div>
          <div id="item2" className="w-full carousel-item">
            <img
              alt="picture_2"
              src={default_image}
              className="object-cover object-center w-full h-64"
            />
          </div>
          <div id="item3" className="w-full carousel-item">
            <img
              alt="picture_3"
              src={default_image}
              className="object-cover object-center w-full h-64"
            />
          </div>
        </div>
        <div className="flex justify-center w-full space-x-2 py-2">
          <a href={`${currentPath}#item1`} className="btn btn-sm btn-circle">
            1
          </a>
          <a href={`${currentPath}#item2`} className="btn btn-sm btn-circle">
            2
          </a>
          <a href={`${currentPath}#item3`} className="btn btn-sm btn-circle">
            3
          </a>
        </div>
      </div>
      {/* Hospital Info */}
      <div className="xl:justify-self-start xl:w-full">
        <div className="flex items-center px-6 py-3 bg-gray-900">
          <HomeIcon
            className="w-6 h-6 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
          />
          <h1 className="mx-3 text-md text-white">
            {props?.community_isolation_name} <br /> {props?.hospital_name}
          </h1>
        </div>

        <div className="px-6 py-4 lg:px-1">
          <h1 className="text-lg font-semibold text-gray-800">
            จำนวนเตียงคงเหลือ{" "}
            <span className="badge badge-primary badge-lg text-xl">
              {props?.bed_left} เตียง
            </span>
          </h1>
          <h1 className="text-base font-semibold text-gray-800">
            จากทั้งหมด{" "}
            <span className="badge badge-primary badge-outline badge-md text-base">
              {props?.available_bed} เตียง
            </span>
          </h1>
          <p className="py-2 text-gray-700 ">{props?.address}</p>
        </div>

        {localStorage.getItem("role") === "PATIENT" && (
          <div>
            <button
              className="btn btn-success btn-block text-base"
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
