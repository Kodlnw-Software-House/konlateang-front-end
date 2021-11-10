import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import bghospital from "../../assets/bg_hospital.jpg";
const ActiveHospital = (props) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <div className="bg-primary-content rounded-box p-4 shadow-md flex flex-col w-80">
        <div className="avatar h-64">
          <img
            className="object-cover max-w-full max-h-full block rounded-box"
            src={`${process.env.REACT_APP_BACKEND_MAIN_URL}hospital/getImage/${props.hospitalId}/${props.image_index[0]}`}
            alt="hospital_pic"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = bghospital;
            }}
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
            <p className="text-lg mt-1 mb-8 truncate md:overflow-hidden">
              {props.hospitalAddress}
            </p>
          </div>
          <div className="text-right">
            <Link
              to={`${currentPath}/community-isolation/id/${props.hospitalId}`}
              className="btn btn-primary btn-md text-lg"
            >
              รายละเอียดเพิ่มเติม
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ActiveHospital;
