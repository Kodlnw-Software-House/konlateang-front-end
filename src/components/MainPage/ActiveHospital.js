import ItemCard from "../ui/ItemCard";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
const ActiveHospital = (props) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <ItemCard>
      <div className="flex space-x-2 overflow-hidden items-center">
        <div className="avatar w-1/3 h-32">
          <img
            className="object-cover max-w-full max-h-full block rounded-box"
            src={props.hospitalPic}
            alt="hospital_pic"
          />
        </div>
        <div className="w-2/3 leading-7">
          <div>
            <p className="text-xl font-bold">{props.hospitalName}</p>
            <p>
              จำนวนเตียงคงเหลือ :
              <span className="badge badge-lg badge-info">
                {props.totalActiveBed}
              </span>
            </p>
            <p className="text-sm mt-1">{props.hospitalAddress}</p>
          </div>
          <div className="mt-2 text-right">
            <Link
              to={`${currentPath}/community-isolation/id/${props.hospitalId}`}
              className="btn btn-primary btn-sm"
            >
              จองเตียง
            </Link>
          </div>
        </div>
      </div>
    </ItemCard>
  );
};
export default ActiveHospital;
