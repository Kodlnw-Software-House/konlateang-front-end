import { motion } from "framer-motion";
import bghospital from "../../assets/bg_hospital.jpg";
import Card from "../ui/Card";
const HospitalAdminActiveHospital = (props) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card>
        <div
          className="bg-green-50 cursor-pointer rounded-box p-4 flex flex-col overflow-hidden items-center text-left space-y-2 md:flex-row md:space-x-4 md:items-start lg:justify-center hover:bg-green-100"
          onClick={() => props.goPath(props.id)}
        >
          <div className="avatar w-full h-60 md:w-1/2 lg:w-1/3">
            <img
              className="object-cover max-w-full max-h-full block rounded-box"
              src={`${process.env.REACT_APP_BACKEND_MAIN_URL}hospital/getImage/${props.id}/${props.image_index[0]}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = bghospital;
              }}
              alt="hospital_pic"
            />
          </div>

          <div className="w-full py-4 md:py-0 md:w-1/2 lg:w-2/3">
            <div className="space-y-2">
              <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
                {props.hospitalName}
              </p>

              <div className="grid grid-cols-2 gap-y-2 justify-items-stretch">
                <p className="col-span-1 text-xl md:text-2xl">คงเหลือ</p>
                <p className="badge badge-lg badge-outline badge-primary text-xl mx-1  justify-self-end md:text-2xl md:py-4">
                  {props.activeBed} เตียง
                </p>
                <p className="col-span-1 text-xl md:text-2xl">จากทั้งหมด</p>
                <p className="badge badge-lg badge-primary text-xl mx-1  justify-self-end md:text-2xl md:py-4">
                  {props.allBed} เตียง
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
export default HospitalAdminActiveHospital;
