function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
const PatientData = (props) => {
  const data = props.modalData;
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
  const rowClass =
    "flex flex-col sm:flex-row justify-between items-center sm:items-start py-2 border-t border-gray-300 last:border-none";
  const leftClass =
    "w-full sm:w-1/3 font-medium text-primary text-center sm:text-left";
  const rightClass = "flex-1 text-center sm:text-left";
  return (
    <div
      data-theme="hospitalTheme"
      className="w-full max-h-96 md:max-h-full overflow-y-scroll"
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
          <span className={rightClass}>{data.status.status_name}</span>
        </div>
      </div>
    </div>
  );
};
export default PatientData;
