import { PencilAltIcon, CheckIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const status = [
  { label: "Booking failed.", value: 1 },
  { label: "Booking successful! In progress.", value: 2 },
  { label: "Done!", value: 3 },
  { label: "In treatment.", value: 4 },
];

const PatientData = (props) => {

  const data = props.modalData;
  const [isEdit, setIsEdit] = useState(false);
  const [patientStatus, setPatientStatus] = useState({
    value: props.modalData.status.status_id,
    label: props.modalData.status.status_name,
  });
  const date = new Date(data.create_at);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes] = [
    addZero(date.getHours()),
    addZero(date.getMinutes()),
  ];
  const realMonth = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ][month];

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };
  const handleChange = (e) => {
    setPatientStatus({
      value: e.target.value,
      label: status[e.target.value - 1],
    });
  };
  const calcelEdit = () => {
    setPatientStatus({
      value: props.modalData.status.status_id,
      label: props.modalData.status.status_name,
    });
    toggleEdit();
  };
  const confirmUpdate = () => {
    if (
      props.modalData.status.status_id === 1 ||
      props.modalData.status.status_id === 3
    ) {
      props.dispatchUpdateStatusError(
        "ไม่สามารถแก้ไขสถานะการจองที่ล้มเหลวหรือรักษาสำเร็จแล้วได้"
      );
      return;
    } else if (
      parseInt(patientStatus.value) === props.modalData.status.status_id
    ) {
      toggleEdit();
      return;
    } else {
      toggleEdit();
      props.updatePatientStatus(data.booking_id, patientStatus.value);
    }
  };
  const rowClass =
    "flex flex-col sm:flex-row justify-between items-center sm:items-start py-2 border-t border-gray-300 last:border-none";
  const leftClass =
    "w-full sm:w-1/3 font-medium text-primary text-center sm:text-left";
  const rightClass = "flex-1 text-center sm:text-left";
  const isConfirmBtn =
    patientStatus.value === props.modalData.status.status_id ? false : true;
  return (
    <div
      data-theme="hospitalTheme"
      className="w-full max-h-96 overflow-y-scroll md:max-h-full md:overflow-y-auto"
    >
      <div className="flex flex-col text-center md:flex-row md:items-baseline md:space-x-2">
        <h3 className="text-2xl font-semibold text-primary-focus">
          รหัสการจองที่ {data.booking_id}
        </h3>
        <h6 className="text-base font-medium">{`${day} ${realMonth} ${year} เวลา ${hour}:${minutes} นาที`}</h6>
      </div>
      <div className="mt-4">
        <div className={rowClass}>
          <span className={leftClass}>รหัสประจำตัวผู้ป่วย</span>
          <span className={rightClass}>{data.patient.patient_id}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>เพศ</span>
          <span className={rightClass}>
            {data.patient.gender === "M" ? "ชาย" : "F" ? "หญิง" : "ไม่ระบุ"}
          </span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>ชื่อ-นามสกุล</span>
          <span
            className={rightClass}
          >{`${data.patient.fname} ${data.patient.lname}`}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>รหัสประจำตัวประชาชน</span>
          <span className={rightClass}>{data.patient.citizen_id}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>วันเดือนปีเกิด / อายุ</span>
          <span
            className={rightClass}
          >{`${data.patient.dob} / ${data.patient.age} ปี`}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>เบอร์โทรศัพท์</span>
          <span className={rightClass}>{data.patient.tel}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>อีเมล</span>
          <span className={rightClass}>{data.patient.email}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>ที่อยู่ปัจจุบัน</span>
          <span className={rightClass}>{data.patient.address}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>สถานะการจอง</span>
          <select
            disabled={!isEdit}
            value={patientStatus.value}
            onChange={handleChange}
            className="flex-1 text-center sm:text-left select-bordered my-2 sm:my-0"
          >
            {status.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <div className="space-x-1">
            {isEdit ? (
              <Fragment>
                <button
                  disabled={!isConfirmBtn}
                  onClick={confirmUpdate}
                  className="btn btn-xs btn-primary"
                >
                  <CheckIcon className="w-6" />
                </button>
                <button
                  className="btn btn-xs btn-secondary"
                  onClick={calcelEdit}
                >
                  <XIcon className="w-6" />
                </button>
              </Fragment>
            ) : (
              <button className="btn btn-xs btn-ghost" onClick={toggleEdit}>
                <PencilAltIcon className="w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientData;
