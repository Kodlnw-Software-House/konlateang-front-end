import { InformationCircleIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { animationOne } from "../animations/animation";

const AdminIsolationTable = (props) => {
  return (
    <table className="table w-full table-zebra">
      <thead>
        <tr>
          <th></th>
          <th
            className="text-center cursor-pointer"
            onClick={() => {
              props.setSort("community_isolation_id");
            }}
          >
            รหัสศูนย์พักคอย
          </th>
          <th
            className="cursor-pointer"
            onClick={() => {
              props.setSort("community_isolation_name");
            }}
          >
            ชื่อศูนย์พักคอย
          </th>
          <th
            className="cursor-pointer"
            onClick={() => {
              props.setSort("available_bed");
            }}
          >
            จำนวนเตียงทั้งหมด
          </th>
          <th>จำนวนเตียงที่เหลือ</th>
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
              <td className="text-center">{data.community_isolation_id}</td>
              <td>{data.community_isolation_name}</td>
              <td>{data.available_bed}</td>
              <td>{data.bed_left}</td>
              <td>
                <InformationCircleIcon
                  className="w-6 cursor-pointer"
                  // onClick={() => {
                  //   props.togglePatientModal(data.patient_id);
                  // }}
                />
              </td>
            </tr>
          );
        })}
      </motion.tbody>
    </table>
  );
};

export default AdminIsolationTable;
