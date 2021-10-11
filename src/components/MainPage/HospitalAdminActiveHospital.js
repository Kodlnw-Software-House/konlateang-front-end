import ItemCard from "../ui/ItemCard";
import bghospital from "../../assets/bg_hospital.jpg";
const HospitalAdminActiveHospital = (props) => {
  return (
    <ItemCard>
      <div
        className="flex space-x-2 overflow-hidden items-center"
        onClick={() => props.goPath(props.id)}
      >
        <div className="avatar w-2/6 h-28">
          <img
            className="object-cover max-w-full max-h-full block rounded-box"
            src={bghospital}
            alt="hospital_pic"
          />
        </div>
        <div className="w-4/6">
          <div>
            <p className="text-xl font-bold">{props.hospitalName}</p>
            <p>
              จำนวนเตียงคงเหลือ:
              <span className="badge badge-lg badge-info mx-1">
                {props.totalActiveBed}
              </span>
            </p>
          </div>
        </div>
      </div>
    </ItemCard>
  );
};
export default HospitalAdminActiveHospital;
