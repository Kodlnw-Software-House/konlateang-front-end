import { InformationCircleIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { animationOne } from "../animations/animation";

const AdminPatientTable = (props) => {
  return (
    <table className="table w-full table-zebra">
      <thead>
        <tr>
          <th></th>
          <th
            className="text-center cursor-pointer"
            onClick={() => {
              props.setSort("patient_id");
            }}
          >
            รหัสผู้ป่วย
          </th>
          <th
            className="cursor-pointer"
            onClick={() => {
              props.setSort("fname");
            }}
          >
            ชื่อ-นามสกุล
          </th>
          <th
            className="cursor-pointer"
            onClick={() => {
              props.setSort("gender");
            }}
          >
            เพศ
          </th>
          <th
            className="cursor-pointer"
            onClick={() => {
              props.setSort("age");
            }}
          >
            อายุ (ปี)
          </th>
          <th
            className="cursor-pointer"
            onClick={() => {
              props.setSort("email");
            }}
          >
            อีเมล
          </th>
          <th></th>
        </tr>
      </thead>
      <motion.tbody
        initial="out"
        animate="in"
        variants={animationOne}
        transition={{ duration: 0.2 }}
      >
        {props.rows.map((data, index) => {
          return (
            <tr className="hover" key={index}>
              <td className="text-center">{(index += 1)}</td>
              <td className="text-center">{data.patient_id}</td>
              <td>{`${data.fname} ${data.lname}`}</td>
              <td>
                {data.gender === "M"
                  ? "ชาย"
                  : data.gender === "F"
                  ? "หญิง"
                  : "ไม่ระบุ"}
              </td>
              <td>{data.age}</td>
              <td>{data.email}</td>
              <td>
                <InformationCircleIcon
                  className="w-6 cursor-pointer"
                  onClick={() => {
                    props.togglePatientModal(data.patient_id);
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

export default AdminPatientTable;
