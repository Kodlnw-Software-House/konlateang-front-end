import { Link } from "react-router-dom";
import { useLocation } from "react-router";
const ActiveHospital = (props) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="bg-primary-content rounded-box p-4 shadow-md flex flex-col w-full max-w-xs">
      <div className="avatar h-64">
        <img
          className="object-cover max-w-full max-h-full block rounded-box"
          src={props.hospitalPic}
          alt="hospital_pic"
        />
      </div>
      <div className="leading-8 py-4">
        <div>
          <p className="text-2xl font-bold">{props.hospitalName}</p>
          <p className="text-lg">
            จำนวนเตียงคงเหลือ:{" "}
            <span className="badge badge-lg badge-info text-xl items-center">
              {props.totalActiveBed}
            </span>
          </p>
          <p className="text-lg mt-1 truncate md:overflow-visible md:whitespace-normal">
            {props.hospitalAddress}
          </p>
        </div>
        <div className="text-right">
          <Link
            to={`${currentPath}/community-isolation/id/${props.hospitalId}`}
            className="btn btn-primary btn-md text-lg"
          >
            จองเตียง
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ActiveHospital;
