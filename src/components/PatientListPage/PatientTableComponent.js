import { InformationCircleIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { animationOne } from "../animations/animation";

const PatientTableComponent = (props) => {
  return (
    <table className="table w-full table-zebra">
      <thead>
        <tr>
          <th className="text-center cursor-pointer">ลำดับ</th>
          <th className="text-center cursor-pointer">รหัสการจอง</th>
          <th className="text-center cursor-pointer">รหัสผู้ป่วย</th>
          <th className="cursor-pointer">ชื่อ-นามสกุล</th>
          <th className="cursor-pointer">เพศ</th>
          <th className="cursor-pointer">จองเมื่อ</th>
          <th className="cursor-pointer">สถานะ</th>
          <th></th>
        </tr>
      </thead>
      <motion.tbody
        initial="out"
        animate="in"
        variants={animationOne}
        transition={{ duration: 0.2 }}
      >
        {props.bookings.map((booking, index) => {
          const date = new Date(Date.parse(booking.create_at));
          return (
            <tr className="hover" key={index}>
              <td className="text-center">{(index += 1)}</td>
              <td className="text-center">{booking.booking_id}</td>
              <td className="text-center">{booking.patient.patient_id}</td>
              <td>{`${booking.patient.fname} ${booking.patient.lname}`}</td>
              <td>
                {booking.patient.gender === "M"
                  ? "ชาย"
                  : "F"
                  ? "หญิง"
                  : "ไม่ระบุ"}
              </td>
              <td>{`${date.getUTCDate()}/${
                date.getUTCMonth() + 1
              }/${date.getUTCFullYear()}`}</td>
              <td>{booking.status.status_name}</td>
              <td>
                <InformationCircleIcon
                  className="w-6 cursor-pointer"
                  onClick={() => {
                    props.togglePatientModal(booking.booking_id);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </motion.tbody>
    </table>
  );
};

export default PatientTableComponent;
